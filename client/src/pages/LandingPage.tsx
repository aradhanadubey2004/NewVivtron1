import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { ThemeToggle } from '../components/common/ThemeToggle';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col selection:bg-[#4D9900] selection:text-white transition-colors duration-200">
      {/* Top Branding Navigation Bar */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40 shadow-xs transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/vivtron-ve-logo.png"
              alt="Vivtron Logo"
              className="w-[70px] sm:w-[82px] h-auto max-h-[58px] object-contain filter drop-shadow-xs"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
              <button
                onClick={() => navigate('/ev')}
                className="hover:text-[#4D9900] dark:hover:text-[#4D9900] transition flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-[#EAF3E5] dark:hover:bg-slate-800"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#4D9900]"></span>
                <span>EV Vehicles</span>
              </button>
              <button
                onClick={() => navigate('/evcs')}
                className="hover:text-[#082B59] dark:hover:text-blue-400 transition flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full hover:bg-[#F1F5F9] dark:hover:bg-slate-800"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#082B59] dark:bg-blue-400"></span>
                <span>EVCS Charging</span>
              </button>
            </div>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            <button
              onClick={() => navigate('/evcs/login')}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-[#082B59] dark:hover:border-blue-500 text-xs font-bold text-[#082B59] dark:text-blue-400 hover:bg-[#082B59] dark:hover:bg-[#082B59] hover:text-white transition shadow-xs cursor-pointer focus:ring-2 focus:ring-[#082B59]"
            >
              <Lock className="w-3.5 h-3.5 text-[#35C759]" />
              <span>EVCS Staff Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Requested Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#101828] dark:text-white max-w-3xl mx-auto leading-tight font-heading mb-6 sm:mb-8">
            Powered By Navodaya Growth Pvt. Ltd.
          </h1>

          {/* TWO COMPACT INTERACTIVE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* CARD 1: EV (Electric Vehicles) */}
            <div
              onClick={() => navigate('/ev')}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border-2 border-[#4D9900]/25 hover:border-[#4D9900] dark:border-lime-900/40 dark:hover:border-lime-500 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#4D9900]/15 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Picture Only - Compact Fit */}
              <div className="w-full rounded-2xl bg-[#f8fbf6] dark:bg-slate-800/60 flex items-center justify-center overflow-hidden p-2">
                <img
                  src="/images/ev-scooter-vivtron.jpg"
                  alt="Vivtron EV Electric Scooter"
                  className="w-full h-48 sm:h-60 object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Pill Button Below Picture */}
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/ev');
                  }}
                  className="w-full py-3 rounded-full bg-[#4D9900] hover:bg-[#438300] dark:bg-lime-600 dark:hover:bg-lime-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm shadow-[#4D9900]/25 transition flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer focus:ring-2 focus:ring-lime-400"
                >
                  <span>Explore EV</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* CARD 2: EVCS (Charging Solutions) */}
            <div
              onClick={() => navigate('/evcs')}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border-2 border-[#082B59]/25 hover:border-[#082B59] dark:border-blue-900/40 dark:hover:border-blue-500 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#082B59]/15 hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Picture Only - Compact Fit */}
              <div className="w-full rounded-2xl bg-[#F1F5F9] dark:bg-slate-800/60 flex items-center justify-center overflow-hidden p-2">
                <img
                  src="/images/evcs-station-vivtron.jpg"
                  alt="Vivtron EVCS Fast Charging Station"
                  className="w-full h-48 sm:h-60 object-contain rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Pill Button Below Picture */}
              <div className="mt-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/evcs');
                  }}
                  className="w-full py-3 rounded-full bg-[#082B59] hover:bg-[#062043] dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold text-xs sm:text-sm tracking-wide shadow-sm shadow-[#082B59]/25 transition flex items-center justify-center gap-2 group-hover:shadow-md cursor-pointer focus:ring-2 focus:ring-[#35C759]"
                >
                  <span>Explore EVCS</span>
                  <ArrowRight className="w-4 h-4 text-[#35C759]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-5 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <img src="/images/vivtron-ve-logo.png" alt="Vivtron" className="h-7 w-auto object-contain" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Powered By Navodaya Growth Pvt. Ltd.</span>
          </div>
          <p>© {new Date().getFullYear()} Vivtron. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
