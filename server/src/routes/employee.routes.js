import { Router } from 'express';
import db from '../config/db.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Allow both Employee and Admin to access employee routes (Admin can inspect employee view),
// but regular Employee cannot access Admin routes.
router.use(verifyToken, requireRole('Employee', 'Admin'));

// ----------------------------------------------------
// 1. Employee Dashboard Overview
// ----------------------------------------------------
router.get('/dashboard', (req, res) => {
  try {
    const userId = req.user.id;

    // Get assigned tasks
    const tasks = db.prepare(`
      SELECT t.id, t.title, t.description, t.priority, t.status, t.due_date, t.created_at,
             s.name as station_name, s.station_code, s.location, s.city
      FROM tasks t
      LEFT JOIN charging_stations s ON t.station_id = s.id
      WHERE t.assigned_to = ?
      ORDER BY 
        CASE t.status 
          WHEN 'In Progress' THEN 1 
          WHEN 'Pending' THEN 2 
          ELSE 3 
        END, t.id DESC
    `).all(userId);

    const pendingTasksCount = tasks.filter(t => t.status === 'Pending').length;
    const inProgressTasksCount = tasks.filter(t => t.status === 'In Progress').length;
    const completedTasksCount = tasks.filter(t => t.status === 'Completed').length;

    // Active charging stations currently being monitored
    const activeStations = db.prepare(`
      SELECT id, station_code, name, location, city, type, power_output, status, uptime_pct
      FROM charging_stations
      WHERE status IN ('Online', 'In Use', 'Maintenance')
      ORDER BY status DESC
      LIMIT 6
    `).all();

    // Notifications and recent activity for this employee
    const notifications = [
      { id: 1, title: 'Shift Telemetry Online', text: 'All field sensor links synced with Vivtron Cloud Core.', time: '10m ago', type: 'info' },
      { id: 2, title: 'Safety Protocol v3.2', text: 'Reminder: Verify 1000V DC isolation before opening secondary cabinet.', time: '1h ago', type: 'warning' },
      { id: 3, title: 'Firmware 4.8 Verification', text: 'OCPP 2.0.1 compliance checks are scheduled for Bay 3.', time: '3h ago', type: 'success' }
    ];

    return res.json({
      success: true,
      data: {
        profile: req.user,
        stats: {
          totalAssigned: tasks.length,
          pendingTasksCount,
          inProgressTasksCount,
          completedTasksCount
        },
        tasks,
        activeStations,
        notifications
      }
    });
  } catch (error) {
    console.error('Employee dashboard error:', error);
    return res.status(500).json({ success: false, message: 'Failed to load employee dashboard.' });
  }
});

// ----------------------------------------------------
// 2. Assigned Tasks & Status Update
// ----------------------------------------------------
router.get('/tasks', (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = db.prepare(`
      SELECT t.id, t.title, t.description, t.priority, t.status, t.due_date, t.created_at,
             s.name as station_name, s.station_code, s.location, s.city
      FROM tasks t
      LEFT JOIN charging_stations s ON t.station_id = s.id
      WHERE t.assigned_to = ?
      ORDER BY t.id DESC
    `).all(userId);

    return res.json({ success: true, data: tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch tasks.' });
  }
});

router.patch('/tasks/:id/status', (req, res) => {
  try {
    const { id } = req.params;
    const { status, resolutionNote } = req.body;
    const userId = req.user.id;

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid task status.' });
    }

    const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND assigned_to = ?').get(id, userId);
    if (!task && req.user.role !== 'Admin') {
      return res.status(404).json({ success: false, message: 'Task not found or not assigned to you.' });
    }

    db.prepare('UPDATE tasks SET status = ? WHERE id = ?').run(status, id);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Task Updated', ?)
    `).run(userId, `${req.user.name} updated task "${task?.title || 'Task #' + id}" status to ${status}${resolutionNote ? ': ' + resolutionNote : ''}.`);

    return res.json({ success: true, message: `Task status updated to ${status}.` });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update task status.' });
  }
});

// ----------------------------------------------------
// 3. Charging Station Telemetry & Issue Reporting
// ----------------------------------------------------
router.get('/stations', (req, res) => {
  try {
    const stations = db.prepare(`
      SELECT id, station_code, name, location, city, type, power_output, connectors, status, uptime_pct, last_inspected
      FROM charging_stations
      ORDER BY id ASC
    `).all();

    return res.json({ success: true, data: stations });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch station data.' });
  }
});

router.post('/stations/:id/report-issue', (req, res) => {
  try {
    const { id } = req.params;
    const { severity = 'Medium', issueTitle, description } = req.body;
    const userId = req.user.id;

    if (!issueTitle) {
      return res.status(400).json({ success: false, message: 'Issue title is required.' });
    }

    const station = db.prepare('SELECT name, station_code FROM charging_stations WHERE id = ?').get(id);
    if (!station) {
      return res.status(404).json({ success: false, message: 'Station not found.' });
    }

    // Automatically create a maintenance task
    db.prepare(`
      INSERT INTO tasks (title, description, assigned_to, station_id, priority, status, due_date)
      VALUES (?, ?, ?, ?, ?, 'Pending', DATE('now', '+2 days'))
    `).run(`[MAINTENANCE] ${issueTitle}`, description || `Reported by ${req.user.name}`, userId, id, severity);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Station Issue Reported', ?)
    `).run(userId, `${req.user.name} reported a ${severity} priority issue on ${station.name}: ${issueTitle}`);

    return res.status(201).json({
      success: true,
      message: `Issue reported successfully and scheduled into maintenance queue.`
    });
  } catch (error) {
    console.error('Report issue error:', error);
    return res.status(500).json({ success: false, message: 'Failed to report station issue.' });
  }
});

// ----------------------------------------------------
// 4. EVCS Products and Technical Specs Reference
// ----------------------------------------------------
router.get('/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
    return res.json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch EVCS product catalog.' });
  }
});

// ----------------------------------------------------
// 5. Employee Profile Management
// ----------------------------------------------------
router.get('/profile', (req, res) => {
  try {
    const user = db.prepare('SELECT id, employee_id, name, email, role, designation, department, phone, status, created_at FROM users WHERE id = ?').get(req.user.id);
    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch profile.' });
  }
});

router.put('/profile', (req, res) => {
  try {
    const { phone } = req.body;
    db.prepare('UPDATE users SET phone = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(phone || '', req.user.id);
    return res.json({ success: true, message: 'Profile contact details updated.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update profile.' });
  }
});

export default router;
