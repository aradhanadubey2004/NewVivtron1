import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight, Zap } from 'lucide-react';
import { FloatingHoverButton } from '../common/FloatingHoverButton';

export const EVFooter: React.FC = () => {
  return (
    <footer className="bg-black text-slate-300 text-sm border-t border-neutral-900 pt-16 sm:pt-20 pb-12 relative overflow-hidden">
      {/* Floating Scroll to Top & Quick Contact Hover Button */}
      <FloatingHoverButton phoneNumber="0120-4144584" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Columns Grid with Equal Balance and Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-14 pb-14 border-b border-neutral-900">
          {/* Column 1: ABOUT US & Logo (lg:col-span-4 for balanced proportions) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="bg-white px-3.5 py-2 rounded-xl inline-flex items-center shadow-md">
                <img
                  src="/images/vivtron-ve-logo.png"
                  alt="Vivtron EV"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="text-white font-extrabold text-xl tracking-wider font-heading">
                VIVTRON <span className="text-[#4D9900]">EV</span>
              </span>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wider font-heading">
                ABOUT US
              </h4>
              <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed text-left">
                VIVTRON is committed to driving a cleaner and greener future through innovative solutions in electric mobility and renewable energy. By developing sustainable transportation and harnessing clean power sources, we aim to reduce carbon emissions, protect our planet, and inspire a shift towards eco-friendly living.
              </p>
            </div>

            {/* EVCS Cross Link Button */}
            <div className="pt-1">
              <Link
                to="/evcs"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#082B59]/30 hover:bg-[#082B59]/60 border border-[#35C759]/40 text-[#35C759] hover:text-[#52e476] text-sm font-bold transition shadow-sm"
              >
                <Zap className="w-4 h-4 text-[#35C759]" />
                <span>Switch to EVCS Charging Stations</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: OUR SITEMAP (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wider font-heading">
              OUR SITEMAP
            </h4>
            <ul className="space-y-4 text-sm sm:text-[15px]">
              <li>
                <Link to="/ev/about" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#4D9900] font-bold">»</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/ev/products" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#4D9900] font-bold">»</span> Products
                </Link>
              </li>
              <li>
                <Link to="/ev/products" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#4D9900] font-bold">»</span> Gallery
                </Link>
              </li>
              <li>
                <Link to="/ev/contact" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#4D9900] font-bold">»</span> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/evcs" className="text-[#35C759] hover:text-[#52e476] font-bold transition flex items-center gap-2 pt-1">
                  <span className="text-[#35C759]">»</span> EVCS Stations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: HEAD OFFICE (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wider font-heading">
                HEAD OFFICE
              </h4>
              <p className="text-white font-bold text-base mt-1.5 tracking-wide">VIVTRON</p>
            </div>

            <div className="space-y-3.5 text-sm sm:text-[15px] text-slate-300">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#4D9900] shrink-0 mt-0.5" />
                <span className="leading-relaxed">G-71, Sector-63, Noida<br />U.P - 201301</span>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-[#4D9900] shrink-0" />
                <a href="tel:0120-4144584" className="hover:text-white transition font-medium">
                  Tel.: 0120-4144584
                </a>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-[#4D9900] shrink-0" />
                <a href="tel:+918929933680" className="hover:text-white transition font-medium">
                  Tel.: +91 8929933680
                </a>
              </div>

              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-[#4D9900] shrink-0" />
                <a href="mailto:info@vivtron.in" className="hover:text-white transition font-medium">
                  Email: info@vivtron.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: CORPORATE OFFICE (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <h4 className="text-white font-extrabold text-base sm:text-lg uppercase tracking-wider font-heading">
                CORPORATE OFFICE
              </h4>
              <p className="text-white font-bold text-base mt-1.5 tracking-wide">VIVTRON</p>
            </div>

            <div className="space-y-3.5 text-sm sm:text-[15px] text-slate-300">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#4D9900] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Gate No. 450 KA, Chand Saray,<br />
                  Gosaiganj, Lucknow<br />
                  Uttar Pradesh - 226501
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <Phone className="w-5 h-5 text-[#4D9900] shrink-0" />
                <a href="tel:+9193057334389" className="hover:text-white transition font-medium">
                  Tel.: +91 93057334389
                </a>
              </div>

              <div className="flex items-center gap-3.5">
                <Mail className="w-5 h-5 text-[#4D9900] shrink-0" />
                <a href="mailto:growthnvodya@gmail.com" className="hover:text-white transition font-medium">
                  Email: growthnvodya@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Clean Spacing */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Powered By Navodaya Growth Pvt Ltd • Vivtron. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/evcs" className="text-[#35C759] hover:text-[#52e476] font-semibold transition flex items-center gap-1.5">
              <span>EVCS Charging Portal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/" className="text-slate-400 hover:text-white transition font-medium">
              Main Home
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
