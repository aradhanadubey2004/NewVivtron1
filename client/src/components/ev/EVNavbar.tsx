import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, ChevronsRight, Gauge } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

export const EVNavbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/ev' },
    { label: 'About Us', path: '/ev/about' },
    { label: 'EV Products', path: '/ev/products' },
    { label: 'Our Solutions', path: '/ev/solutions' },
    { label: 'Services', path: '/ev/services' },
    { label: 'Contact Us', path: '/ev/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/ev') return location.pathname === '/ev';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-[#4D9900]/20 dark:border-lime-900/40 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Brand Logo Only */}
          <div className="flex items-center shrink-0">
            <Link to="/ev" className="flex items-center group">
              <img
                src="/images/vivtron-ve-logo.png"
                alt="Vivtron EV Logo"
                className="w-[70px] sm:w-[82px] h-auto max-h-[58px] object-contain rounded-xl shadow-xs group-hover:scale-105 transition"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
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
                    ? 'text-[#4D9900] dark:text-lime-400 bg-[#eaf3e5] dark:bg-lime-950/50 border border-[#4D9900]/35 dark:border-lime-800/60 shadow-xs'
                    : 'text-[#101828] dark:text-slate-300 hover:text-[#4D9900] dark:hover:text-lime-400 hover:bg-[#eaf3e5]/60 dark:hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: Theme Toggle, Main Portal & Action Button (Pill Buttons) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Main Portal Button on Right Side */}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#eaf3e5] hover:bg-[#dfeada] dark:bg-slate-800 dark:hover:bg-slate-700 text-[#101828] dark:text-slate-200 text-xs font-bold rounded-full border border-[#4D9900]/20 dark:border-slate-700 transition shadow-xs focus:ring-2 focus:ring-[#4D9900]/30"
              title="Return to Main Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#101828] dark:text-slate-300" />
              <span>Main Portal</span>
            </Link>

            <Link
              to="/ev/contact"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#4D9900] hover:bg-[#408000] dark:bg-lime-600 dark:hover:bg-lime-700 text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md shadow-[#4D9900]/25 transition hover:scale-[1.02] focus:ring-2 focus:ring-[#4D9900]"
            >
              <Gauge className="w-4 h-4" />
              <span>Book Test Ride</span>
            </Link>
          </div>

          {/* Mobile hamburger & controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <Link
              to="/"
              className="p-2 text-[#101828] dark:text-slate-200 rounded-full bg-[#eaf3e5] dark:bg-slate-800 border border-[#4D9900]/20 dark:border-slate-700"
              title="Main Portal"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#101828] dark:text-slate-200 hover:text-slate-900 rounded-full bg-[#eaf3e5] dark:bg-slate-800 border border-[#4D9900]/20 dark:border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-[#4D9900]/20 dark:border-lime-900/40 px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-full text-sm font-semibold transition group ${
                  active
                    ? 'bg-[#eaf3e5] dark:bg-lime-950/60 text-[#4D9900] dark:text-lime-400 border border-[#4D9900]/30 dark:border-lime-800/60'
                    : 'text-[#101828] dark:text-slate-300 hover:bg-[#eaf3e5]/50 dark:hover:bg-slate-800 hover:text-[#4D9900] dark:hover:text-lime-400'
                }`}
              >
                <span>{link.label}</span>
                <ChevronsRight
                  className={`w-4 h-4 transition-all duration-200 group-hover:translate-x-1 ${
                    active
                      ? 'text-[#4D9900] dark:text-lime-400'
                      : 'text-slate-400 group-hover:text-[#4D9900] dark:group-hover:text-lime-400'
                  }`}
                />
              </Link>
            );
          })}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/ev/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 bg-[#4D9900] hover:bg-[#408000] dark:bg-lime-600 dark:hover:bg-lime-700 text-white font-bold rounded-full text-sm shadow-md shadow-[#4D9900]/20 flex items-center justify-center gap-2"
            >
              <Gauge className="w-4 h-4" />
              <span>Book a Test Ride</span>
            </Link>
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 bg-[#eaf3e5] dark:bg-slate-800 text-[#101828] dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-semibold rounded-full text-sm border border-[#4D9900]/20 dark:border-slate-700 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Vivtron Portal</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
