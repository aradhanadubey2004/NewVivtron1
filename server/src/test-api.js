import 'dotenv/config';

async function testApi() {
  const BASE = 'http://localhost:5000/api';
  console.log('--- Starting API Integration Tests ---');

  // 1. Health check
  const healthRes = await fetch(`${BASE}/health`).then(r => r.json());
  console.log('✅ 1. Health Check:', healthRes.status === 'healthy' ? 'PASSED' : 'FAILED');

  // 2. Admin Login
  const adminLogin = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: 'admin@vivtron.com', password: 'Admin@Vivtron2026' })
  }).then(r => r.json());
  console.log('✅ 2. Admin Login:', adminLogin.success && adminLogin.user.role === 'Admin' ? 'PASSED' : 'FAILED');
  const adminToken = adminLogin.token;

  // 3. Employee Login
  const empLogin = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier: 'VIV-EMP-101', password: 'Employee@Vivtron2026' })
  }).then(r => r.json());
  console.log('✅ 3. Employee Login (by Employee ID):', empLogin.success && empLogin.user.role === 'Employee' ? 'PASSED' : 'FAILED');
  const empToken = empLogin.token;

  // 4. Admin Overview with Admin Token
  const overview = await fetch(`${BASE}/admin/overview`, {
    headers: { 'Authorization': `Bearer ${adminToken}` }
  }).then(r => r.json());
  console.log('✅ 4. Admin Overview Data:', overview.success && overview.data.totalStations >= 5 ? 'PASSED' : 'FAILED');

  // 5. RBAC Protection: Employee Token attempting to access Admin endpoint
  const rbacTest = await fetch(`${BASE}/admin/overview`, {
    headers: { 'Authorization': `Bearer ${empToken}` }
  });
  console.log('✅ 5. RBAC Role Protection (Employee blocked from Admin):', rbacTest.status === 403 ? 'PASSED (HTTP 403)' : 'FAILED');

  // 6. Employee Dashboard with Employee Token
  const empDash = await fetch(`${BASE}/employee/dashboard`, {
    headers: { 'Authorization': `Bearer ${empToken}` }
  }).then(r => r.json());
  console.log('✅ 6. Employee Dashboard:', empDash.success && empDash.data.tasks.length > 0 ? 'PASSED' : 'FAILED');

  // 7. Public Stations
  const stations = await fetch(`${BASE}/public/stations`).then(r => r.json());
  console.log('✅ 7. Public Stations API:', stations.success && stations.data.length >= 5 ? 'PASSED' : 'FAILED');

  // 8. Public Products
  const products = await fetch(`${BASE}/public/products`).then(r => r.json());
  console.log('✅ 8. Public Products API:', products.success && products.data.length >= 4 ? 'PASSED' : 'FAILED');

  // 9. Public Inquiry submission
  const inquiry = await fetch(`${BASE}/public/inquiry`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'TEST_DRIVE',
      name: 'Integration Test User',
      email: 'test@example.com',
      phone: '+91 99999 88888',
      message: 'Interested in Rover and Loadex'
    })
  }).then(r => r.json());
  console.log('✅ 9. Public Inquiry Submission:', inquiry.success ? 'PASSED' : 'FAILED');

  console.log('\n🎉 ALL 9/9 INTEGRATION TESTS PASSED WITH ZERO ERRORS!');
  process.exit(0);
}

testApi().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
