import bcrypt from 'bcryptjs';
import db, { initDatabase } from '../config/db.js';

export async function runSeed() {
  console.log('--- Initializing database tables ---');
  initDatabase();

  const existingUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (existingUsers && existingUsers.count > 0) {
    console.log(`Database already contains ${existingUsers.count} users. Cleaning up for clean seed...`);
    db.exec(`
      DELETE FROM activities;
      DELETE FROM tasks;
      DELETE FROM inquiries;
      DELETE FROM products;
      DELETE FROM charging_stations;
      DELETE FROM users;
      DELETE FROM sqlite_sequence WHERE name IN ('activities', 'tasks', 'inquiries', 'products', 'charging_stations', 'users');
    `);
  }

  console.log('--- Seeding Users ---');
  const salt = await bcrypt.genSalt(10);
  const adminHash = await bcrypt.hash('Admin@Vivtron2026', salt);
  const empHash1 = await bcrypt.hash('Employee@Vivtron2026', salt);
  const empHash2 = await bcrypt.hash('FieldTech@2026', salt);
  const empHash3 = await bcrypt.hash('GridTech@2026', salt);

  const insertUser = db.prepare(`
    INSERT INTO users (employee_id, name, email, password_hash, role, designation, department, phone, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run('VIV-ADM-001', 'Marcus Vance', 'admin@vivtron.com', adminHash, 'Admin', 'Chief Infrastructure Director', 'Executive Operations', '+1 (555) 019-2831', 'Active');
  insertUser.run('VIV-EMP-101', 'Elena Rostova', 'employee@vivtron.com', empHash1, 'Employee', 'Senior EVCS Field Specialist', 'Operations & Maintenance', '+1 (555) 018-9942', 'Active');
  insertUser.run('VIV-EMP-102', 'Sarah Jenkins', 'sarah.field@vivtron.com', empHash2, 'Employee', 'Charging Hardware Technician', 'Field Engineering', '+1 (555) 017-3841', 'Active');
  insertUser.run('VIV-EMP-103', 'Dev Patel', 'dev.patel@vivtron.com', empHash3, 'Employee', 'Grid Integration Engineer', 'Power Systems', '+1 (555) 016-5519', 'Active');
  insertUser.run('VIV-EMP-104', 'Liam O’Connor', 'liam.oc@vivtron.com', empHash1, 'Employee', 'Customer Support Specialist', 'Client Relations', '+1 (555) 015-8833', 'Inactive');

  console.log('--- Seeding Charging Stations ---');
  const insertStation = db.prepare(`
    INSERT INTO charging_stations (station_code, name, location, city, type, power_output, connectors, status, total_sessions, energy_dispensed_kwh, uptime_pct, last_inspected)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertStation.run(
    'VIV-ST-001',
    'Vivtron EVCS - Connaught Place Central',
    'Outer Circle, Connaught Place',
    'New Delhi',
    'Ultra-Fast Hub',
    '360 kW',
    '4x CCS2, 2x CHAdeMO',
    'Online',
    4820,
    184500.5,
    99.9,
    '2026-10-25'
  );

  console.log('--- Seeding EVCS Products ---');
  const insertProduct = db.prepare(`
    INSERT INTO products (product_code, name, category, power_rating, price, stock_status, description, specs)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProduct.run(
    'PROD-VIV-360',
    'Vivtron HyperCharge 360',
    'Commercial Hub',
    '360 kW Dual-Cabinet',
    48500.00,
    'In Stock',
    'Flagship ultra-fast DC fast charging station with liquid-cooled cables and dynamic power sharing up to 500A.',
    JSON.stringify({ voltage: '200-1000V DC', efficiency: '96.5%', screen: '15.6" Sunlight Readable Touch', cableLength: '5.5m Liquid Cooled', protocol: 'OCPP 2.0.1 / ISO 15118' })
  );

  insertProduct.run(
    'PROD-VIV-180',
    'Vivtron RapidPulse 180',
    'DC Fast',
    '180 kW Modular',
    28900.00,
    'In Stock',
    'Compact high-reliability DC fast charger ideal for retail plazas, fleet depots, and highway corridors.',
    JSON.stringify({ voltage: '150-1000V DC', efficiency: '95.8%', screen: '10.1" Touch', cableLength: '4.8m Air Cooled', protocol: 'OCPP 1.6J / 2.0.1' })
  );

  insertProduct.run(
    'PROD-VIV-60',
    'Vivtron UrbanFleet 60',
    'DC Fast',
    '60 kW Compact',
    14200.00,
    'In Stock',
    'Wall-mountable or pedestal DC fast charger engineered for commercial fleets and overnight turnaround.',
    JSON.stringify({ voltage: '200-920V DC', efficiency: '95.2%', screen: '7" Display', cableLength: '4.0m', protocol: 'OCPP 1.6J' })
  );

  insertProduct.run(
    'PROD-VIV-22',
    'Vivtron ProWall 22',
    'AC Wallbox',
    '22 kW Three-Phase',
    1850.00,
    'In Stock',
    'Smart AC commercial charging station with integrated RFID, Wi-Fi/4G, and dynamic load balancing.',
    JSON.stringify({ voltage: '400V AC 3-Phase', efficiency: '99.1%', screen: 'LED Matrix + App', cableLength: '7.0m Type 2', protocol: 'OCPP 1.6J' })
  );

  insertProduct.run(
    'PROD-VIV-DEPOT',
    'Vivtron MegaDepot Pantograph 600',
    'Fleet Depot',
    '600 kW Inverted Pantograph',
    89000.00,
    'Built to Order',
    'Heavy-duty automated overhead bus and truck charging system with automated connection in < 15 seconds.',
    JSON.stringify({ voltage: '400-1000V DC', efficiency: '97.0%', screen: 'Industrial HMI Telemetry', cableLength: 'Overhead Mast', protocol: 'ISO 15118-20 / OCPP 2.0.1' })
  );

  // Look up inserted foreign key IDs dynamically to ensure absolute integrity
  const adminUser = db.prepare('SELECT id FROM users WHERE employee_id = ?').get('VIV-ADM-001');
  const elenaUser = db.prepare('SELECT id FROM users WHERE employee_id = ?').get('VIV-EMP-101');
  const sarahUser = db.prepare('SELECT id FROM users WHERE employee_id = ?').get('VIV-EMP-102');
  const devUser = db.prepare('SELECT id FROM users WHERE employee_id = ?').get('VIV-EMP-103');

  const st1 = db.prepare('SELECT id FROM charging_stations WHERE station_code = ?').get('VIV-ST-001');

  console.log('--- Seeding Tasks ---');
  const insertTask = db.prepare(`
    INSERT INTO tasks (title, description, assigned_to, station_id, priority, status, due_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertTask.run(
    'Connaught Place Liquid Cable Telemetry Inspection',
    'Perform diagnostic check on cooling pump pressure sensor and replace filter valve.',
    elenaUser?.id || null,
    st1?.id || null,
    'High',
    'In Progress',
    '2026-10-24'
  );

  insertTask.run(
    'Quarterly Safety & Calibration Audit',
    'Inspect ground fault circuit, cable wear, and high voltage contactor impedance on Bay 1-4.',
    elenaUser?.id || null,
    st1?.id || null,
    'Medium',
    'Pending',
    '2026-10-27'
  );

  insertTask.run(
    'Connaught Place Grid Feed Optimization',
    'Coordinate with local utility for breaker recalibration following power surge event.',
    sarahUser?.id || null,
    st1?.id || null,
    'Critical',
    'Pending',
    '2026-10-23'
  );

  insertTask.run(
    'Firmware Upgrade v4.8 Rollout',
    'Deploy OCPP 2.0.1 TLS 1.3 security update across all 4 dispensers.',
    devUser?.id || null,
    st1?.id || null,
    'Low',
    'Completed',
    '2026-10-21'
  );

  console.log('--- Seeding Activities ---');
  const insertActivity = db.prepare(`
    INSERT INTO activities (user_id, action, details)
    VALUES (?, ?, ?)
  `);

  insertActivity.run(adminUser?.id || null, 'System Audit', 'Admin Marcus Vance reviewed Q4 grid compliance metrics.');
  insertActivity.run(elenaUser?.id || null, 'Station Inspection', 'Elena Rostova initiated diagnostics on Connaught Place Central Superhub.');
  insertActivity.run(devUser?.id || null, 'Firmware Update', 'Dev Patel completed firmware deployment v4.8 to Connaught Place Central Superhub.');
  insertActivity.run(adminUser?.id || null, 'Employee Update', 'Admin Marcus Vance updated credentials for Dev Patel.');

  console.log('--- Seeding Sample Inquiries ---');
  const insertInquiry = db.prepare(`
    INSERT INTO inquiries (type, name, email, phone, message)
    VALUES (?, ?, ?, ?, ?)
  `);

  insertInquiry.run('EVCS_STATION_HOST', 'Apex Logistics Corp', 'procurement@apexlogistics.com', '+1 (555) 492-1029', 'Interested in installing four 240kW DC fast chargers for our delivery fleet in Oakland.');
  insertInquiry.run('TEST_DRIVE', 'David K.', 'david.k@gmail.com', '+1 (555) 301-8492', 'Requested test drive for Vivtron Stellar GT Performance Edition in San Francisco.');

  console.log('✅ Seeding completed successfully!');
}

if (process.argv[1].endsWith('seed.js')) {
  runSeed().catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
  });
}
