import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProtectedRoute } from './components/dashboard/ProtectedRoute';

// Public Landing & EV Pages
import { LandingPage } from './pages/LandingPage';
import { EVHome } from './pages/ev/EVHome';
import { EVAbout } from './pages/ev/EVAbout';
import { EVProducts } from './pages/ev/EVProducts';
import { EVSolutions } from './pages/ev/EVSolutions';
import { EVServices } from './pages/ev/EVServices';
import { EVContact } from './pages/ev/EVContact';

// Public EVCS Pages
import { EVCSHome } from './pages/evcs/EVCSHome';
import { EVCSAbout } from './pages/evcs/EVCSAbout';
import { EVCSSolutions } from './pages/evcs/EVCSSolutions';
import { EVCSProducts } from './pages/evcs/EVCSProducts';
import { EVCSServices } from './pages/evcs/EVCSServices';
import { EVCSContact } from './pages/evcs/EVCSContact';
import { EVCSLogin } from './pages/evcs/EVCSLogin';

// Protected Admin Dashboard Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEmployees } from './pages/admin/AdminEmployees';
import { AdminStations } from './pages/admin/AdminStations';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminKYC } from './pages/admin/AdminKYC';
import { AdminBankDetails } from './pages/admin/AdminBankDetails';
import { AdminProductPurchase } from './pages/admin/AdminProductPurchase';
import { AdminMyPurchases } from './pages/admin/AdminMyPurchases';
import { AdminIncomeHistory } from './pages/admin/AdminIncomeHistory';
import { AdminWithdrawals } from './pages/admin/AdminWithdrawals';
import { AdminMyTeam } from './pages/admin/AdminMyTeam';
import { AdminTeamTree } from './pages/admin/AdminTeamTree';

// Protected Employee Dashboard Pages
import { EmployeeDashboard } from './pages/employee/EmployeeDashboard';
import { EmployeeTasks } from './pages/employee/EmployeeTasks';
import { EmployeeStations } from './pages/employee/EmployeeStations';
import { EmployeeProducts } from './pages/employee/EmployeeProducts';
import { EmployeeProfile } from './pages/employee/EmployeeProfile';
import { EmployeeKYC } from './pages/employee/EmployeeKYC';
import { EmployeeBankDetails } from './pages/employee/EmployeeBankDetails';
import { EmployeeProductPurchase } from './pages/employee/EmployeeProductPurchase';
import { EmployeeMyPurchases } from './pages/employee/EmployeeMyPurchases';
import { EmployeeIncomeHistory } from './pages/employee/EmployeeIncomeHistory';
import { EmployeeWithdrawals } from './pages/employee/EmployeeWithdrawals';
import { EmployeeMyTeam } from './pages/employee/EmployeeMyTeam';
import { EmployeeTeamTree } from './pages/employee/EmployeeTeamTree';

import AOS from 'aos';

export function App() {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      offset: 60,
    });
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Main Portal Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* EV Section (Distinct Navbar & Pages) */}
            <Route path="/ev" element={<EVHome />} />
            <Route path="/ev/about" element={<EVAbout />} />
            <Route path="/ev/products" element={<EVProducts />} />
            <Route path="/ev/solutions" element={<EVSolutions />} />
            <Route path="/ev/services" element={<EVServices />} />
            <Route path="/ev/contact" element={<EVContact />} />

            {/* EVCS Public Section (Distinct Navbar & Pages) */}
            <Route path="/evcs" element={<EVCSHome />} />
            <Route path="/evcs/about" element={<EVCSAbout />} />
            <Route path="/evcs/solutions" element={<EVCSSolutions />} />
            <Route path="/evcs/products" element={<EVCSProducts />} />
            <Route path="/evcs/services" element={<EVCSServices />} />
            <Route path="/evcs/login" element={<EVCSLogin />} />
            <Route path="/evcs/register" element={<EVCSLogin initialMode="register" />} />
            <Route path="/login" element={<EVCSLogin initialMode="login" />} />
            <Route path="/register" element={<EVCSLogin initialMode="register" />} />

            {/* Protected Admin Routes */}
            <Route
              path="/evcs/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/employees"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminEmployees />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/stations"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminStations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/products"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/analytics"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/settings"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminSettings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/kyc"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminKYC />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/bank-details"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminBankDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/product-purchase"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminProductPurchase />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/my-purchases"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminMyPurchases />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/income-history"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminIncomeHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/withdrawals"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminWithdrawals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/my-team"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminMyTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/admin/team-tree"
              element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminTeamTree />
                </ProtectedRoute>
              }
            />

            {/* Protected Employee Routes */}
            <Route
              path="/evcs/employee/dashboard"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/tasks"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeTasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/stations"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeStations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/products"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/profile"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/kyc"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeKYC />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/bank-details"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeBankDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/product-purchase"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeProductPurchase />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/my-purchases"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeMyPurchases />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/income-history"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeIncomeHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/withdrawals"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeWithdrawals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/my-team"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeMyTeam />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evcs/employee/team-tree"
              element={
                <ProtectedRoute allowedRoles={['Employee', 'Admin']}>
                  <EmployeeTeamTree />
                </ProtectedRoute>
              }
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
