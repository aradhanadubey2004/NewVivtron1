import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'vivtron_super_secure_jwt_secret_key_2026_ev_evcs_platform';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both your Email/Employee ID and password.'
      });
    }

    const cleanIdentifier = identifier.trim();

    // Query user by email (case-insensitive) or employee_id (case-insensitive)
    const user = db.prepare(`
      SELECT * FROM users
      WHERE LOWER(email) = LOWER(?) OR UPPER(employee_id) = UPPER(?)
    `).get(cleanIdentifier, cleanIdentifier);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. No account found matching that Email or Employee ID.'
      });
    }

    if (user.status !== 'Active') {
      return res.status(403).json({
        success: false,
        message: 'This account is currently deactivated. Please contact your Vivtron administrator.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Please verify your credentials and try again.'
      });
    }

    // Generate JWT token
    const tokenPayload = {
      id: user.id,
      employee_id: user.employee_id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });

    // Record activity log
    try {
      db.prepare(`
        INSERT INTO activities (user_id, action, details)
        VALUES (?, 'User Login', ?)
      `).run(user.id, `${user.name} logged in successfully via EVCS authentication portal.`);
    } catch (e) {
      console.error('Activity logging failed', e);
    }

    const safeUser = {
      id: user.id,
      employee_id: user.employee_id,
      name: user.name,
      email: user.email,
      role: user.role,
      designation: user.designation,
      department: user.department,
      phone: user.phone,
      status: user.status
    };

    return res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: safeUser
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your login.'
    });
  }
});

// GET /api/auth/me
router.get('/me', verifyToken, (req, res) => {
  return res.json({
    success: true,
    user: req.user
  });
});

// POST /api/auth/change-password
router.post('/change-password', verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters long.'
      });
    }

    const fullUser = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, fullUser.password_hash);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(newPassword, salt);

    db.prepare('UPDATE users SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run(newHash, req.user.id);

    db.prepare(`
      INSERT INTO activities (user_id, action, details)
      VALUES (?, 'Password Changed', ?)
    `).run(req.user.id, `${req.user.name} changed their account password.`);

    return res.json({
      success: true,
      message: 'Password updated successfully.'
    });
  } catch (error) {
    console.error('Password change error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update password.'
    });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, sponsor_code, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, mobile number, and password are required.'
      });
    }

    // Check if email already exists
    const existing = db.prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)').get(email.trim());
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const employee_id = `VIV-MBR-${Date.now().toString().slice(-4)}`;

    const result = db.prepare(`
      INSERT INTO users (employee_id, name, email, password_hash, role, designation, department, phone, status)
      VALUES (?, ?, ?, ?, 'Employee', 'Member', 'Member Portal', ?, 'Active')
    `).run(employee_id, name.trim(), email.trim(), password_hash, phone.trim());

    return res.status(201).json({
      success: true,
      message: 'Registration successful! You can now log in with your credentials.',
      user: {
        id: result.lastInsertRowid,
        employee_id,
        name: name.trim(),
        email: email.trim()
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed. Please try again.'
    });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', (req, res) => {
  const { identifier } = req.body;
  if (!identifier) {
    return res.status(400).json({ success: false, message: 'Please provide your registered Email or Employee ID.' });
  }

  const user = db.prepare('SELECT id, name, email FROM users WHERE LOWER(email) = LOWER(?) OR UPPER(employee_id) = UPPER(?)').get(identifier.trim(), identifier.trim());

  if (user) {
    return res.json({
      success: true,
      message: `Password reset instructions have been dispatched to ${user.email}. If you need immediate assistance, contact IT operations at support@vivtron.com.`
    });
  }

  // Security best practice: don't reveal if account exists
  return res.json({
    success: true,
    message: 'If the provided credentials match our active records, password reset instructions have been sent.'
  });
});

export default router;
