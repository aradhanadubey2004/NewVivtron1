import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, LogIn, ChevronsRight, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';

export const EVCSNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { label: 'Home', path: '/evcs' },
    { label: 'About Us', path: '/evcs/about' },
    { label: 'Charging Solutions', path: '/evcs/solutions' },
    { label: 'Our Products', path: '/evcs/products' },
    { label: 'Services', path: '/evcs/services' },
    { label: 'Contact Us', path: '/evcs/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/evcs') return location.pathname === '/evcs';
    return location.pathname.startsWith(path);
  };

  const getDashboardPath = () => {
    if (!user) return '/evcs/login';
    return user.role === 'Admin' ? '/evcs/admin/dashboard' : '/evcs/employee/dashboard';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo Only */}
          <div className="flex items-center shrink-0">
            <Link to="/evcs" className="flex items-center group">
              <img
                src="/images/vivtron-ve-logo.png"
                alt="Vivtron EVCS Logo"
                className="w-[70px] sm:w-[82px] h-auto max-h-[58px] object-contain rounded-xl shadow-xs group-hover:scale-105 transition"
              />
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-1 xl:gap-2 flex-1 px-4 whitespace-nowrap">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 text-sm font-semibold rounded-full transition duration-150 ${
                  isActive(link.path)
                    ? 'text-[#082B59] dark:text-blue-400 bg-[#082B59]/10 dark:bg-blue-950/60 border border-[#082B59]/25 dark:border-blue-800/60 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#082B59] dark:hover:text-blue-400 hover:bg-[#082B59]/5 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Theme Toggle, Main Portal & Auth Actions (Pill Buttons) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Main Portal Button on Right Side */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F1F5F9] hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#082B59] dark:text-slate-200 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 transition shadow-xs focus:ring-2 focus:ring-slate-400"
              title="Return to Main Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#082B59] dark:text-slate-300" />
              <span>Main Portal</span>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={getDashboardPath()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#082B59] hover:bg-[#062247] dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-xs font-bold rounded-full shadow-md shadow-[#082B59]/25 transition hover:scale-[1.02]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-[#35C759]" />
                  <span>{user.role} Dashboard</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-950/30 transition border border-transparent hover:border-red-200 dark:hover:border-red-900 cursor-pointer"
                  title="Log out of EVCS Portal"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/evcs/login"
                className={`inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-full transition shadow-md ${
                  location.pathname === '/evcs/login'
                    ? 'bg-[#082B59] dark:bg-blue-600 text-white shadow-[#082B59]/25 ring-2 ring-[#35C759]/40'
                    : 'bg-[#082B59] hover:bg-[#062247] dark:bg-blue-600 dark:hover:bg-blue-700 text-white shadow-[#082B59]/20 hover:scale-[1.02]'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 text-[#35C759]" />
                <span>EVCS Login</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger & controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Link
              to="/"
              className="p-2 text-[#082B59] dark:text-slate-200 rounded-full bg-[#F1F5F9] dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              title="Main Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              to="/evcs/login"
              className="p-2 text-[#082B59] dark:text-blue-400 hover:bg-[#082B59]/10 dark:hover:bg-blue-950/50 text-xs border border-[#082B59]/25 dark:border-blue-800 rounded-full bg-[#F1F5F9] dark:bg-slate-800"
              title="EVCS Login"
            >
              <LogIn className="w-4 h-4 text-[#35C759]" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#082B59] dark:text-slate-200 hover:text-slate-900 rounded-full bg-[#F1F5F9] dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-semibold transition group ${
                  active
                    ? 'bg-[#082B59]/10 dark:bg-blue-950/60 text-[#082B59] dark:text-blue-400 border border-[#082B59]/25 dark:border-blue-800/60'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-[#082B59]/5 dark:hover:bg-slate-800 hover:text-[#082B59] dark:hover:text-blue-400'
                }`}
              >
                <span>{link.label}</span>
                <ChevronsRight
                  className={`w-4 h-4 transition-all duration-200 group-hover:translate-x-1 ${
                    active
                      ? 'text-[#35C759] dark:text-blue-400'
                      : 'text-slate-400 group-hover:text-[#35C759] dark:group-hover:text-blue-400'
                  }`}
                />
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-2.5 bg-[#082B59] dark:bg-blue-600 text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20"
                >
                  <LayoutDashboard className="w-4 h-4 text-[#35C759]" />
                  <span>Go to {user.role} Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-center py-2.5 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-bold rounded-full text-sm flex items-center justify-center gap-2 border border-red-200 dark:border-red-900"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/evcs/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 bg-[#082B59] dark:bg-blue-600 text-white font-bold rounded-full text-sm flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20"
              >
                <LogIn className="w-4 h-4 text-[#35C759]" />
                <span>EVCS Login</span>
              </Link>
            )}

            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 bg-[#F1F5F9] dark:bg-slate-800 text-[#082B59] dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold rounded-full text-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4 text-[#082B59]" />
              <span>Back to Main Vivtron Portal</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
