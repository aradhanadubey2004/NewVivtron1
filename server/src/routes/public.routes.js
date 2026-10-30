import { Router } from 'express';
import db from '../config/db.js';

const router = Router();

// GET /api/public/stations - Live network overview
router.get('/stations', (req, res) => {
  try {
    const stations = db.prepare(`
      SELECT id, station_code, name, location, city, type, power_output, connectors, status, uptime_pct
      FROM charging_stations
    `).all();

    return res.json({ success: true, data: stations });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch public stations.' });
  }
});

// GET /api/public/products - Public equipment catalog
router.get('/products', (req, res) => {
  try {
    const products = db.prepare(`
      SELECT id, product_code, name, category, power_rating, price, stock_status, description, specs, image
      FROM products
    `).all();

    return res.json({ success: true, data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch catalog.' });
  }
});

// POST /api/public/inquiry - Test drive or partner inquiry
router.post('/inquiry', (req, res) => {
  try {
    const { type = 'GENERAL', name, email, phone, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required.' });
    }

    db.prepare(`
      INSERT INTO inquiries (type, name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(type, name.trim(), email.trim(), phone || '', message || '');

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your request has been securely received by the Vivtron team. An engineering advisor will reach out shortly.'
    });
  } catch (error) {
    console.error('Inquiry error:', error);
    return res.status(500).json({ success: false, message: 'Failed to submit inquiry.' });
  }
});

// GET /api/public/network-stats - Public live network counters
router.get('/network-stats', (req, res) => {
  try {
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_stations,
        SUM(CASE WHEN status = 'Online' OR status = 'In Use' THEN 1 ELSE 0 END) as active_stations,
        SUM(energy_dispensed_kwh) as total_kwh,
        SUM(total_sessions) as total_sessions
      FROM charging_stations
    `).get();

    return res.json({
      success: true,
      data: {
        totalStations: stats.total_stations,
        activeStations: stats.active_stations,
        totalKwhDispensed: Math.round(stats.total_kwh || 0),
        totalSessions: stats.total_sessions || 0,
        uptimePercentage: 99.85
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch network stats.' });
  }
});

export default router;
