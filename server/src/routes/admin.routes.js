import { Router } from 'express';
import bcrypt from 'bcryptjs';
import db from '../config/db.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Protect all admin routes with verifyToken and Admin role requirement
router.use(verifyToken, requireRole('Admin'));

// ----------------------------------------------------
// 1. Dashboard Overview & Analytics
// ----------------------------------------------------
router.get('/overview', (req, res) => {
  try {
    const totalEmployees = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
    const activeEmployees = db.prepare("SELECT COUNT(*) as count FROM users WHERE status = 'Active'").get().count;
    const totalStations = db.prepare("SELECT COUNT(*) as count FROM charging_stations").get().count;
    const onlineStations = db.prepare("SELECT COUNT(*) as count FROM charging_stations WHERE status = 'Online'").get().count;
    const totalProducts = db.prepare("SELECT COUNT(*) as count FROM products").get().count;
    const pendingTasks = db.prepare("SELECT COUNT(*) as count FROM tasks WHERE status != 'Completed'").get().count;

    const energyStats = db.prepare("SELECT SUM(energy_dispensed_kwh) as total_kwh, SUM(total_sessions) as total_sessions FROM charging_stations").get();

    const recentActivities = db.prepare(`
      SELECT a.id, a.action, a.details, a.timestamp, u.name as user_name, u.role as user_role
      FROM activities a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.timestamp DESC
      LIMIT 10
    `).all();

    const stationStatusBreakdown = db.prepare(`
      SELECT status, COUNT(*) as count
      FROM charging_stations
      GROUP BY status
    `).all();

    return res.json({
      success: true,
      data: {
        totalEmployees,
        activeEmployees,
        totalStations,
        onlineStations,
        totalProducts,
        pendingTasks,
        totalKwhDispensed: energyStats.total_kwh || 0,
        totalSessions: energyStats.total_sessions || 0,
        recentActivities,
        stationStatusBreakdown
      }
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load dashboard overview.' });
  }
});

// ----------------------------------------------------
// 2. Employee Management
// ----------------------------------------------------
router.get('/employees', (req, res) => {
  try {
    const employees = db.prepare(`
      SELECT id, employee_id, name, email, role, designation, department, phone, status, created_at, updated_at
      FROM users
      ORDER BY id ASC
    `).all();

    return res.json({ success: true, data: employees });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch employees.' });
  }
});

// Add Employee
router.post('/employees', async (req, res) => {
  try {
    const { name, email, password, role = 'Employee', designation, department, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }

    // Check email uniqueness
    const existing = db.prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)').get(email.trim());
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    // Generate automatic employee ID if not provided or use provided
    let finalEmployeeId = req.body.employee_id ? req.body.employee_id.trim().toUpperCase() : '';
    if (!finalEmployeeId) {
      const lastEmp = db.prepare("SELECT id FROM users WHERE role = 'Employee' ORDER BY id DESC LIMIT 1").get();
      const nextNum = (lastEmp ? lastEmp.id + 101 : 101).toString();
      finalEmployeeId = role === 'Admin' ? `VIV-ADM-${nextNum}` : `VIV-EMP-${nextNum}`;
    }

    // Check employee_id uniqueness
    const existingId = db.prepare('SELECT id FROM users WHERE UPPER(employee_id) = UPPER(?)').get(finalEmployeeId);
    if (existingId) {
      finalEmployeeId = `${finalEmployeeId}-${Date.now().toString().slice(-3)}`;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const stmt = db.prepare(`
      INSERT INTO users (employee_id, name, email, password_hash, role, designation, department, phone, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active')
    `);

    const info = stmt.run(finalEmployeeId, name.trim(), email.trim(), password_hash, role, designation || '', department || '', phone || '');

    // Log activity
    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Create Employee', ?)
    `).run(req.user.id, `Admin registered new employee profile: ${name} (${finalEmployeeId}) with role ${role}.`);

    return res.status(201).json({
      success: true,
      message: `Employee ${name} (${finalEmployeeId}) registered successfully by Admin.`,
      user: {
        id: Number(info.lastInsertRowid),
        employee_id: finalEmployeeId,
        name: name.trim(),
        email: email.trim(),
        role,
        designation: designation || '',
        department: department || '',
        phone: phone || '',
        status: 'Active'
      }
    });
  } catch (error) {
    console.error('Create employee error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create employee account.' });
  }
});

// Admin Reset Employee Password
router.post('/employees/:id/reset-password', async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.trim().length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const user = db.prepare('SELECT id, name, employee_id, email FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword.trim(), salt);

    db.prepare('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(password_hash, id);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Admin Reset Password', ?)
    `).run(req.user.id, `Admin reset login password for employee ${user.name} (${user.employee_id}).`);

    return res.json({
      success: true,
      message: `Login password for ${user.name} (${user.employee_id}) has been updated successfully.`
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, message: 'Failed to reset employee password.' });
  }
});

// Update Employee
router.put('/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, designation, department, phone, status, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    // Prevent deactivating or demoting the current logged in super admin if they are the only admin
    if (Number(id) === req.user.id && (status === 'Inactive' || role !== 'Admin')) {
      const adminCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'Admin' AND status = 'Active'").get().count;
      if (adminCount <= 1) {
        return res.status(400).json({ success: false, message: 'Cannot deactivate or demote the sole active administrator.' });
      }
    }

    let passwordHash = user.password_hash;
    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      passwordHash = await bcrypt.hash(password.trim(), salt);
    }

    db.prepare(`
      UPDATE users
      SET name = ?, email = ?, role = ?, designation = ?, department = ?, phone = ?, status = ?, password_hash = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(
      name || user.name,
      email || user.email,
      role || user.role,
      designation !== undefined ? designation : user.designation,
      department !== undefined ? department : user.department,
      phone !== undefined ? phone : user.phone,
      status || user.status,
      passwordHash,
      id
    );

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Update Employee', ?)
    `).run(req.user.id, `Updated details for employee ${name || user.name} (${user.employee_id}).`);

    return res.json({ success: true, message: 'Employee details updated successfully.' });
  } catch (error) {
    console.error('Update employee error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update employee.' });
  }
});

// Toggle Employee Status
router.patch('/employees/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const user = db.prepare('SELECT id, name, status, role FROM users WHERE id = ?').get(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Employee not found.' });
    }

    if (Number(id) === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot alter your own account active status.' });
    }

    const nextStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    db.prepare('UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(nextStatus, id);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Status Change', ?)
    `).run(req.user.id, `Changed account status of ${user.name} to ${nextStatus}.`);

    return res.json({ success: true, message: `Employee status changed to ${nextStatus}.`, status: nextStatus });
  } catch (error) {
    console.error('Status change error:', error);
    return res.status(500).json({ success: false, message: 'Failed to update employee status.' });
  }
});

// ----------------------------------------------------
// 3. Charging Station Management
// ----------------------------------------------------
router.get('/stations', (req, res) => {
  try {
    const stations = db.prepare('SELECT * FROM charging_stations ORDER BY id DESC').all();
    return res.json({ success: true, data: stations });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch charging stations.' });
  }
});

router.post('/stations', (req, res) => {
  try {
    const { name, location, city, type, power_output, connectors, status = 'Online' } = req.body;
    if (!name || !location || !city || !type || !power_output) {
      return res.status(400).json({ success: false, message: 'Please provide all required station fields.' });
    }

    const count = db.prepare('SELECT COUNT(*) as count FROM charging_stations').get().count;
    const station_code = `VIV-ST-${(count + 1).toString().padStart(3, '0')}`;

    db.prepare(`
      INSERT INTO charging_stations (station_code, name, location, city, type, power_output, connectors, status, total_sessions, energy_dispensed_kwh, uptime_pct, last_inspected)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 99.9, CURRENT_DATE)
    `).run(station_code, name, location, city, type, power_output, connectors || 'CCS2', status);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Create Station', ?)
    `).run(req.user.id, `Commissioned new charging station ${name} (${station_code}) in ${city}.`);

    return res.status(201).json({ success: true, message: `Station ${name} created successfully.` });
  } catch (error) {
    console.error('Create station error:', error);
    return res.status(500).json({ success: false, message: 'Failed to create charging station.' });
  }
});

router.put('/stations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, city, type, power_output, connectors, status, uptime_pct } = req.body;

    db.prepare(`
      UPDATE charging_stations
      SET name = ?, location = ?, city = ?, type = ?, power_output = ?, connectors = ?, status = ?, uptime_pct = ?
      WHERE id = ?
    `).run(name, location, city, type, power_output, connectors, status, uptime_pct, id);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Update Station', ?)
    `).run(req.user.id, `Updated charging station specifications for Station #${id} (${name}).`);

    return res.json({ success: true, message: 'Station updated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update charging station.' });
  }
});

router.delete('/stations/:id', (req, res) => {
  try {
    const { id } = req.params;
    const station = db.prepare('SELECT name, station_code FROM charging_stations WHERE id = ?').get(id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found.' });
    }

    db.prepare('DELETE FROM charging_stations WHERE id = ?').run(id);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Delete Station', ?)
    `).run(req.user.id, `Decommissioned and deleted station ${station.name} (${station.station_code}).`);

    return res.json({ success: true, message: 'Station decommissioned successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete station.' });
  }
});

// ----------------------------------------------------
// 4. Product Management
// ----------------------------------------------------
router.get('/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    return res.json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch products.' });
  }
});

router.post('/products', (req, res) => {
  try {
    const { name, category, power_rating, price, stock_status = 'In Stock', description, specs } = req.body;
    if (!name || !category || !power_rating || !price) {
      return res.status(400).json({ success: false, message: 'Please provide all required product fields.' });
    }

    const count = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const product_code = `PROD-VIV-${(count + 1).toString().padStart(3, '0')}`;

    db.prepare(`
      INSERT INTO products (product_code, name, category, power_rating, price, stock_status, description, specs)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(product_code, name, category, power_rating, Number(price), stock_status, description || '', typeof specs === 'object' ? JSON.stringify(specs) : (specs || '{}'));

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Create Product', ?)
    `).run(req.user.id, `Added new EVCS product ${name} (${product_code}) to catalog.`);

    return res.status(201).json({ success: true, message: `Product ${name} added successfully.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to add product.' });
  }
});

router.put('/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, power_rating, price, stock_status, description, specs } = req.body;

    db.prepare(`
      UPDATE products
      SET name = ?, category = ?, power_rating = ?, price = ?, stock_status = ?, description = ?, specs = ?
      WHERE id = ?
    `).run(name, category, power_rating, Number(price), stock_status, description, typeof specs === 'object' ? JSON.stringify(specs) : specs, id);

    return res.json({ success: true, message: 'Product updated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update product.' });
  }
});

router.delete('/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return res.json({ success: true, message: 'Product removed from catalog.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete product.' });
  }
});

export default router;
