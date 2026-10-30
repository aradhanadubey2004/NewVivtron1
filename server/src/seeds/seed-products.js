import db, { initDatabase } from '../config/db.js';

export function seedProducts() {
  initDatabase();

  try {
    db.exec('ALTER TABLE products ADD COLUMN image TEXT;');
  } catch (e) {
    // Column might already exist
  }

  const existing = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (existing && existing.count > 0) {
    console.log(`Products already exist (${existing.count}). Updating image paths...`);
    db.prepare('UPDATE products SET image = ? WHERE product_code = ?').run('/images/evcs-hardware/hypercharge-360.jpg', 'PROD-VIV-360');
    db.prepare('UPDATE products SET image = ? WHERE product_code = ?').run('/images/evcs-hardware/rapidpulse-180.jpg', 'PROD-VIV-180');
    db.prepare('UPDATE products SET image = ? WHERE product_code = ?').run('/images/evcs-hardware/urbanfleet-60.jpg', 'PROD-VIV-60');
    db.prepare('UPDATE products SET image = ? WHERE product_code = ?').run('/images/evcs-hardware/prowall-22.jpg', 'PROD-VIV-22');
    db.prepare('UPDATE products SET image = ? WHERE product_code = ?').run('/images/evcs-hardware/megadepot-600.jpg', 'PROD-VIV-DEPOT');
    return;
  }

  console.log('Seeding products with images...');
  const insertProduct = db.prepare(`
    INSERT INTO products (product_code, name, category, power_rating, price, stock_status, description, specs, image)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProduct.run(
    'PROD-VIV-360',
    'Vivtron HyperCharge 360',
    'Commercial Hub',
    '360 kW Dual-Cabinet',
    48500.00,
    'In Stock',
    'Flagship ultra-fast DC fast charging station with liquid-cooled cables and dynamic power sharing up to 500A.',
    JSON.stringify({ voltage: '200-1000V DC', efficiency: '96.5%', screen: '15.6" Sunlight Readable Touch', cableLength: '5.5m Liquid Cooled', protocol: 'OCPP 2.0.1 / ISO 15118' }),
    '/images/evcs-hardware/hypercharge-360.jpg'
  );

  insertProduct.run(
    'PROD-VIV-180',
    'Vivtron RapidPulse 180',
    'DC Fast',
    '180 kW Modular',
    28900.00,
    'In Stock',
    'Compact high-reliability DC fast charger ideal for retail plazas, fleet depots, and highway corridors.',
    JSON.stringify({ voltage: '150-1000V DC', efficiency: '95.8%', screen: '10.1" Touch', cableLength: '4.8m Air Cooled', protocol: 'OCPP 1.6J / 2.0.1' }),
    '/images/evcs-hardware/rapidpulse-180.jpg'
  );

  insertProduct.run(
    'PROD-VIV-60',
    'Vivtron UrbanFleet 60',
    'DC Fast',
    '60 kW Compact',
    14200.00,
    'In Stock',
    'Wall-mountable or pedestal DC fast charger engineered for commercial fleets and overnight turnaround.',
    JSON.stringify({ voltage: '200-920V DC', efficiency: '95.2%', screen: '7" Display', cableLength: '4.0m', protocol: 'OCPP 1.6J' }),
    '/images/evcs-hardware/urbanfleet-60.jpg'
  );

  insertProduct.run(
    'PROD-VIV-22',
    'Vivtron ProWall 22',
    'AC Wallbox',
    '22 kW Three-Phase',
    1850.00,
    'In Stock',
    'Smart AC commercial charging station with integrated RFID, Wi-Fi/4G, and dynamic load balancing.',
    JSON.stringify({ voltage: '400V AC 3-Phase', efficiency: '99.1%', screen: 'LED Matrix + App', cableLength: '7.0m Type 2', protocol: 'OCPP 1.6J' }),
    '/images/evcs-hardware/prowall-22.jpg'
  );

  insertProduct.run(
    'PROD-VIV-DEPOT',
    'Vivtron MegaDepot Pantograph 600',
    'Fleet Depot',
    '600 kW Inverted Pantograph',
    89000.00,
    'Built to Order',
    'Heavy-duty automated overhead bus and truck charging system with automated connection in under 15 seconds.',
    JSON.stringify({ voltage: '400-1000V DC', efficiency: '97.0%', screen: 'Industrial HMI Telemetry', cableLength: 'Overhead Mast', protocol: 'ISO 15118-20 / OCPP 2.0.1' }),
    '/images/evcs-hardware/megadepot-600.jpg'
  );

  console.log('Seeded 5 products with images successfully.');
}

seedProducts();
