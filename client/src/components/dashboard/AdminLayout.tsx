import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { FloatingHoverButton } from '../common/FloatingHoverButton';
import {
  LayoutDashboard,
  CheckSquare,
  FileSpreadsheet,
  Coins,
  Wallet,
  Gift,
  Landmark,
  Award,
  Crown,
  Layers,
  Users,
  ShoppingCart,
  LogOut,
  Menu,
  X,
  ChevronsLeft,
  ChevronDown,
  User as UserIcon,
  Plus,
  ExternalLink,
  ArrowLeft,
  Zap,
  Sparkles
} from 'lucide-react';

export const AdminLayout: React.FC<{
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
  category?: string;
}> = ({ children, pageTitle, pageSubtitle, category }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const [collapsed, setCollapsed] = useState(false);
  const [workspaceExpanded, setWorkspaceExpanded] = useState(true);
  const [adminPanelExpanded, setAdminPanelExpanded] = useState(true);

  // Exact WORKSPACE items matching reference screenshot 1
  const workspaceItems = [
    { id: 'ws-dashboard', label: 'Dashboard', path: '/evcs/admin/dashboard', iconEmoji: '🏠' },
    { id: 'ws-kyc', label: 'KYC', path: '/evcs/admin/kyc', iconEmoji: '✅' },
    { id: 'ws-bank', label: 'Bank Details', path: '/evcs/admin/bank-details', iconEmoji: '🏛️' },
    { id: 'ws-purchase', label: 'Product Purchase', path: '/evcs/admin/product-purchase', iconEmoji: '👤' },
    { id: 'ws-my-purchases', label: 'My Purchases', path: '/evcs/admin/my-purchases', iconEmoji: '📦' },
    { id: 'ws-income', label: 'Income History', path: '/evcs/admin/income-history', iconEmoji: '💰' },
    { id: 'ws-withdrawals', label: 'Withdrawals', path: '/evcs/admin/withdrawals', iconEmoji: '💸' },
    { id: 'ws-team', label: 'My Team', path: '/evcs/admin/my-team', iconEmoji: '👥' },
    { id: 'ws-tree', label: 'Team Tree', path: '/evcs/admin/team-tree', iconEmoji: '🌳' },
    { id: 'ws-recharge', label: 'Recharge Stations', path: '/evcs/admin/stations', iconEmoji: '⚡' },
    { id: 'ws-profile', label: 'Profile', path: '/evcs/admin/settings', iconEmoji: '👤' },
  ];

  // Exact ADMIN PANEL items matching reference screenshots 2 & 3
  const adminPanelItems = [
    { id: 'ap-stations', label: 'Station Locations', path: '/evcs/admin/stations', iconEmoji: '📍' },
    { id: 'ap-dashboard', label: 'Admin Dashboard', path: '/evcs/admin/dashboard?panel=admin', iconEmoji: '📊' },
    { id: 'ap-kyc', label: 'KYC Management', path: '/evcs/admin/kyc', iconEmoji: '✅' },
    { id: 'ap-sales', label: 'Sales Management', path: '/evcs/admin/analytics?tab=sales', iconEmoji: '📈' },
    { id: 'ap-income', label: 'Income Management', path: '/evcs/admin/analytics?tab=income', iconEmoji: '💰' },
    { id: 'ap-withdrawals', label: 'Withdrawals Management', path: '/evcs/admin/analytics?tab=withdrawals', iconEmoji: '💳' },
    { id: 'ap-rewards', label: 'Rewards', path: '/evcs/admin/settings?tab=rewards', iconEmoji: '🎁' },
    { id: 'ap-banks', label: 'Banks Approval', path: '/evcs/admin/bank-details', iconEmoji: '🏛️' },
    { id: 'ap-rank', label: 'Rank Settings', path: '/evcs/admin/settings?tab=rank', iconEmoji: '🎖️' },
    { id: 'ap-reward-settings', label: 'Reward Settings', path: '/evcs/admin/settings?tab=reward-settings', iconEmoji: '🎁' },
    { id: 'ap-royalty', label: 'Royalty Settings', path: '/evcs/admin/settings?tab=royalty', iconEmoji: '👑' },
    { id: 'ap-level', label: 'Level Settings', path: '/evcs/admin/settings?tab=level', iconEmoji: '📊' },
    { id: 'ap-employees', label: 'Employee Management', path: '/evcs/admin/employees', iconEmoji: '👨‍💼' },
    { id: 'ap-requests', label: 'Purchase Requests', path: '/evcs/admin/products?tab=requests', iconEmoji: '🛒' },
  ];

  const isItemActive = (item: { id: string; path: string }) => {
    const currentFull = location.pathname + location.search;
    if (item.path.includes('?')) {
      return currentFull === item.path;
    }
    if (item.path === '/evcs/admin/dashboard') {
      return location.pathname === '/evcs/admin/dashboard' && (!location.search || location.search === '');
    }
    return location.pathname === item.path;
  };

  const handleLogout = () => {
    logout();
    navigate('/evcs/login');
  };

  const displayName = user?.name || 'NAVODAYA GROWTH PVT.LTD';

  return (
    <div className="h-screen w-full bg-[#F4F7FA] text-slate-800 flex flex-col md:flex-row overflow-hidden selection:bg-[#2EB85C] selection:text-white">
      {/* Sidebar Desktop - Deep Navy #041D4A matching reference screenshots */}
      <aside
        className={`hidden md:flex flex-col h-full bg-[#041D4A] text-white border-r border-[#0D2D63] shrink-0 select-none shadow-2xl relative z-20 overflow-hidden transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'
          }`}
      >
        {/* Fixed Header: Logo Branding with Collapse Icon « */}
        <div className="p-4 sm:p-5 pb-4 border-b border-[#0D2D63] shrink-0 bg-[#041D4A]">
          <div className="flex items-center justify-between">
            <Link to="/evcs/admin/dashboard" className="flex items-center gap-2.5 min-w-0">
              <div className="bg-white p-1 rounded-xl shadow-md flex items-center justify-center shrink-0">
                <img
                  src="/images/vivtron-ve-logo.png"
                  alt="Vivtron EVCS"
                  className="h-7 w-auto object-contain"
                />
              </div>
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-black text-white text-base tracking-tight font-sans leading-tight truncate">
                    VIVTRON EVCS
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider font-sans">
                    Admin Portal
                  </span>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? 'Expand Menu' : 'Collapse Menu'}
              className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer shrink-0 ml-1"
            >
              <span className="text-base font-black leading-none select-none font-sans">
                {collapsed ? '»' : '«'}
              </span>
            </button>
          </div>
        </div>

        {/* Scrollable Middle: Navigation Links (Independently scrollable) */}
        <div className="flex-1 overflow-y-auto px-3.5 py-3 pb-8 space-y-1 dark-scrollbar min-h-0 font-sans">
          {/* ================= SECTION 1: WORKSPACE ================= */}
          <div className="mb-2">
            {!collapsed ? (
              <div
                onClick={() => setWorkspaceExpanded(!workspaceExpanded)}
                className="flex items-center justify-between px-2 pt-1 pb-1 cursor-pointer group"
              >
                <div>
                  <span className="text-[11px] font-extrabold text-[#7AA2E8] uppercase tracking-wider font-sans">
                    WORKSPACE
                  </span>
                  <div className="w-14 h-[2px] bg-[#1E60D5] rounded-full mt-1 mb-1"></div>
                </div>
              </div>
            ) : (
              <div className="w-8 h-[2px] bg-[#1E60D5] mx-auto my-2 rounded-full"></div>
            )}

            {workspaceExpanded && (
              <nav className="space-y-1 mt-1">
                {workspaceItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <div key={item.id} className="relative">
                      {/* Left glowing cyan accent bar outside the button, matching Screenshot 1 */}
                      {active && (
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF] z-10"></span>
                      )}

                      <Link
                        to={item.path}
                        title={collapsed ? item.label : undefined}
                        className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3 py-2.5'
                          } rounded-xl text-xs font-bold transition-all duration-150 group ${active
                            ? 'bg-[#1363DF] text-white font-black shadow-md shadow-[#1363DF]/35'
                            : 'text-slate-100 hover:text-white hover:bg-[#0A2E63] hover:border hover:border-[#144284]/50'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-base select-none shrink-0 w-6 text-center group-hover:scale-110 transition-transform">
                            {item.iconEmoji}
                          </span>
                          {!collapsed && (
                            <span className="tracking-tight truncate text-[13px] font-bold leading-snug">
                              {item.label}
                            </span>
                          )}
                        </div>

                        {/* Active glowing white dot indicator on right, matching Screenshot 1 */}
                        {!collapsed && active && (
                          <span className="w-2.5 h-2.5 rounded-full bg-white ml-2 shrink-0 shadow-xs"></span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </nav>
            )}
          </div>

          {/* ================= SECTION DIVIDER ================= */}
          <div className="border-t border-[#0D2D63] my-3 mx-1"></div>

          {/* ================= SECTION 2: ADMIN PANEL ================= */}
          <div className="mb-2">
            {!collapsed ? (
              <div
                onClick={() => setAdminPanelExpanded(!adminPanelExpanded)}
                className="flex items-center justify-between px-2 pt-1 pb-1 cursor-pointer group"
              >
                <div>
                  <span className="text-[11px] font-extrabold text-[#7AA2E8] uppercase tracking-wider font-sans">
                    ADMIN PANEL
                  </span>
                  <div className="w-16 h-[2px] bg-[#1E60D5] rounded-full mt-1 mb-1"></div>
                </div>
              </div>
            ) : (
              <div className="w-8 h-[2px] bg-[#1E60D5] mx-auto my-2 rounded-full"></div>
            )}

            {adminPanelExpanded && (
              <nav className="space-y-1 mt-1">
                {adminPanelItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <div key={item.id} className="relative">
                      {/* Left glowing cyan accent bar */}
                      {active && (
                        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-r-full bg-[#00D2FF] shadow-[0_0_10px_#00D2FF] z-10"></span>
                      )}

                      <Link
                        to={item.path}
                        title={collapsed ? item.label : undefined}
                        className={`flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3 py-2.5'
                          } rounded-xl text-xs font-bold transition-all duration-150 group ${active
                            ? 'bg-[#1363DF] text-white font-black shadow-md shadow-[#1363DF]/35'
                            : 'text-slate-100 hover:text-white hover:bg-[#0A2E63] hover:border hover:border-[#144284]/50'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-base select-none shrink-0 w-6 text-center group-hover:scale-110 transition-transform">
                            {item.iconEmoji}
                          </span>
                          {!collapsed && (
                            <span className="tracking-tight text-[13px] font-bold leading-snug">
                              {item.label}
                            </span>
                          )}
                        </div>

                        {/* Active glowing indicator dot */}
                        {!collapsed && active && (
                          <span className="w-2.5 h-2.5 rounded-full bg-white ml-2 shrink-0 shadow-xs"></span>
                        )}
                      </Link>
                    </div>
                  );
                })}

                {/* Direct Logout item with brown door emoji matching Screenshot 3 */}
                <button
                  onClick={handleLogout}
                  title={collapsed ? 'Logout' : undefined}
                  className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3 py-2.5'
                    } rounded-xl text-xs font-bold text-slate-100 hover:text-white hover:bg-[#0A2E63] hover:border hover:border-[#144284]/50 transition-all duration-150 group cursor-pointer text-left`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-base select-none shrink-0 w-6 text-center group-hover:scale-110 transition-transform">
                      🚪
                    </span>
                    {!collapsed && (
                      <span className="tracking-tight text-[13px] font-bold leading-snug">
                        Logout
                      </span>
                    )}
                  </div>
                </button>
              </nav>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden font-sans">
        {/* Top Header matching reference screenshots exactly */}
        <header className="bg-white border-b border-slate-200/90 px-4 sm:px-8 py-3.5 sm:py-4 shrink-0 z-30 shadow-2xs font-sans">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Toggle & Page Title */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 md:hidden cursor-pointer"
                aria-label="Toggle Menu"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <h1 className="text-2xl sm:text-3xl font-black text-[#0A1D37] font-sans tracking-tight leading-tight">
                {pageTitle || 'Dashboard'}
              </h1>
            </div>

            {/* Right: User Account Dropdown Pill Badge from Screenshot */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="px-3.5 py-1.5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-200 flex items-center gap-2.5 cursor-pointer"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center p-1">
                    <img
                      src="/images/vivtron-ve-logo.png"
                      alt="Avatar"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#2EB85C] border-2 border-white"></span>
                </div>

                <div className="text-left hidden sm:block">
                  <div className="text-xs font-black text-[#0A1D37] leading-tight truncate max-w-[180px]">
                    {displayName}
                  </div>
                  <div className="text-[10px] text-[#2EB85C] font-extrabold flex items-center gap-1">
                    <span>Active account</span>
                  </div>
                </div>

                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {/* Dropdown Flyout Card matching reference Screenshot 1 & 2 */}
              {userDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserDropdownOpen(false)}
                  />

                  {/* Flyout Card */}
                  <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl bg-white border border-slate-200/90 shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* Top Header with vibrant gradient */}
                    <div className="bg-gradient-to-r from-[#144FBA] via-[#1E60D5] to-[#2EB85C] p-6 text-center text-white relative">
                      {/* Circular logo badge */}
                      <div className="w-20 h-20 rounded-full bg-white mx-auto p-2 shadow-xl flex items-center justify-center border-2 border-white/80">
                        <img
                          src="/images/vivtron-ve-logo.png"
                          alt="Vivtron EVCS Logo"
                          className="w-14 h-14 object-contain"
                        />
                      </div>

                      <h3 className="font-extrabold text-base sm:text-lg text-white mt-3 font-heading tracking-tight leading-tight">
                        {displayName}
                      </h3>
                      <p className="text-xs text-white/85 font-mono mt-0.5">
                        {user?.email || 'info@vivtronevcs.com'}
                      </p>
                    </div>

                    {/* Card Body Profile Details */}
                    <div className="p-6 space-y-4 text-xs">
                      <div className="space-y-2.5 text-slate-700">
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="font-bold text-slate-900 w-16">Name :</span>
                          <span className="font-semibold text-slate-800">{displayName}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="font-bold text-slate-900 w-16">Email :</span>
                          <span className="text-slate-600 font-mono">{user?.email || 'info@vivtronevcs.com'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="font-bold text-slate-900 w-16">Role :</span>
                          <span className="font-bold text-slate-800 lowercase">{user?.role || 'admin'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="font-bold text-slate-900 w-16">Status :</span>
                          <span className="inline-flex items-center gap-1 font-bold text-[#2EB85C]">
                            <span className="w-2 h-2 rounded-full bg-[#2EB85C] animate-pulse"></span>
                            <span>active</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="font-bold text-slate-900 w-16">Rank :</span>
                          <span className="font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                            {user?.designation || 'Pre Sales Executive'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                          <span className="font-bold text-slate-900 w-16">KYC :</span>
                          <span className="font-bold text-[#2EB85C] capitalize">approved</span>
                        </div>
                      </div>

                      {/* Upload Profile Image Header & Actions */}
                      <div className="pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-800 block mb-2.5">
                          Upload Profile Image
                        </span>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <button
                            onClick={() => {
                              navigate('/evcs/admin/settings');
                              setUserDropdownOpen(false);
                            }}
                            className="py-2.5 px-3 rounded-xl bg-[#EBF5FF] hover:bg-blue-100 text-[#1E60D5] font-bold text-xs text-center transition cursor-pointer"
                          >
                            View Profile
                          </button>
                          <button
                            onClick={() => {
                              navigate('/evcs/admin/settings');
                              setUserDropdownOpen(false);
                            }}
                            className="py-2.5 px-3 rounded-xl bg-[#EAF3E5] hover:bg-emerald-100 text-[#2EB85C] font-bold text-xs text-center transition cursor-pointer"
                          >
                            Change Photo
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#1E293B] hover:bg-[#0F172A] text-white font-bold text-xs text-center transition mb-3 cursor-pointer shadow-xs"
                        >
                          Remove Profile Image
                        </button>

                        <button
                          onClick={handleLogout}
                          className="w-full py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-500/20"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="md:hidden bg-[#041D4A] text-white border-b border-[#0D2D63] p-4 space-y-3 shadow-2xl max-h-[75vh] overflow-y-auto dark-scrollbar shrink-0">
            {/* WORKSPACE Section */}
            <div>
              <div className="mb-1.5 px-2">
                <span className="text-[10px] font-extrabold text-[#7AA2E8] font-sans uppercase tracking-wider">
                  WORKSPACE
                </span>
                <div className="w-12 h-[2px] bg-[#1E60D5] rounded-full mt-0.5"></div>
              </div>
              <div className="space-y-1">
                {workspaceItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${active
                          ? 'bg-[#1363DF] text-white font-black'
                          : 'text-slate-100 hover:text-white hover:bg-[#0A2E63]'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base select-none w-5 text-center">{item.iconEmoji}</span>
                        <span>{item.label}</span>
                      </div>
                      {active && <span className="w-2 h-2 rounded-full bg-white"></span>}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ADMIN PANEL Section */}
            <div className="pt-2 border-t border-[#0D2D63]">
              <div className="mb-1.5 px-2">
                <span className="text-[10px] font-extrabold text-[#7AA2E8] font-sans uppercase tracking-wider">
                  ADMIN PANEL
                </span>
                <div className="w-12 h-[2px] bg-[#1E60D5] rounded-full mt-0.5"></div>
              </div>
              <div className="space-y-1">
                {adminPanelItems.map((item) => {
                  const active = isItemActive(item);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${active
                          ? 'bg-[#1363DF] text-white font-black'
                          : 'text-slate-100 hover:text-white hover:bg-[#0A2E63]'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base select-none w-5 text-center">{item.iconEmoji}</span>
                        <span>{item.label}</span>
                      </div>
                      {active && <span className="w-2 h-2 rounded-full bg-white"></span>}
                    </Link>
                  );
                })}

                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-100 hover:text-white hover:bg-[#0A2E63] cursor-pointer"
                >
                  <span className="text-base select-none w-5 text-center">🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#0D2D63]">
              <button
                onClick={handleLogout}
                className="w-full py-2 bg-red-500/20 text-white font-bold rounded-xl text-xs text-center border border-red-500/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Workspace Body - Independently Scrollable */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative content-scrollbar min-h-0">
          {children}

          {/* Floating Hover Button */}
          <FloatingHoverButton phoneNumber="0120-4144584" />
        </main>
      </div>
    </div>
  );
};
