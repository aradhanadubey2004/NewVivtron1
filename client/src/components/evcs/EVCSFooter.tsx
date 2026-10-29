import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { FloatingHoverButton } from '../common/FloatingHoverButton';

export const EVCSFooter: React.FC = () => {
  return (
    <footer className="bg-black text-slate-300 text-sm relative pt-14 overflow-hidden">
      {/* Floating Scroll to Top & Quick Contact Hover Button */}
      <FloatingHoverButton phoneNumber="07651912140" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Dealership CTA Banner with Generous Spacing */}
        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="bg-[#050b14] border border-neutral-800 rounded-3xl p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-2xl"
        >
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
              Vivtron EVCS Dealership Smart Business,
            </h3>
            <p className="text-lg sm:text-xl font-bold text-slate-300">Sustainable Future</p>
          </div>

          <Link
            to="/evcs/contact"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#082B59] hover:bg-[#0a356d] text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#082B59]/60 hover:scale-105 hover:-translate-y-0.5 active:scale-95 shrink-0 group border border-white/10 hover:border-[#35C759]/50"
          >
            <span>Join Dealership</span>
            <div className="w-5 h-5 rounded-full bg-white text-[#082B59] group-hover:bg-[#35C759] group-hover:text-white flex items-center justify-center font-bold text-xs transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-sm">
              ↗
            </div>
          </Link>
        </div>

        {/* Main Columns Grid with Equal Balance and Generous Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 xl:gap-14 pb-16">
          {/* Column 1: Brand Logo Box, Description & EV Link (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
            <div className="p-4 rounded-2xl bg-[#0d141e] border border-neutral-800/80 inline-block shadow-md">
              <div className="bg-white px-4 py-2.5 rounded-xl flex items-center justify-center">
                <img
                  src="/images/vivtron-ve-logo.png"
                  alt="Vivtron EVCS"
                  className="h-11 w-auto object-contain"
                />
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-[15px] leading-relaxed max-w-sm">
              Experience intelligent EV charging solutions designed for seamless travel, faster charging, real-time connectivity, and reliable performance.
            </p>

            {/* EV Vehicles Cross Link (Prominently Visible) */}
            <div className="pt-1">
              <Link
                to="/ev"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[#09170c] hover:bg-[#102916] border border-[#4D9900]/50 text-[#4D9900] hover:text-lime-300 text-sm font-bold transition shadow-sm"
              >
                <span>Switch to EV Electric Vehicles</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Product & Services (lg:col-span-2.5 / lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
            <h4 className="text-white font-extrabold text-base sm:text-lg tracking-wider uppercase font-heading">
              Product & Services
            </h4>
            <ul className="space-y-4 text-sm sm:text-[15px]">
              <li>
                <Link to="/evcs/services" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> EV-CMS
                </Link>
              </li>
              <li>
                <Link to="/evcs/solutions" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> EVCS Solution
                </Link>
              </li>
              <li>
                <Link to="/evcs/services" className="text-[#35C759] hover:text-[#52e476] font-bold transition flex items-center gap-2">
                  <span className="text-[#35C759] font-bold">»</span> EV Mobile APP
                </Link>
              </li>
              <li>
                <Link to="/evcs/solutions" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> Fleet Charging
                </Link>
              </li>
              <li>
                <Link to="/evcs/products" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> Manufacturing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Link (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-5" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
            <h4 className="text-white font-extrabold text-base sm:text-lg tracking-wider uppercase font-heading">
              Quick Link
            </h4>
            <ul className="space-y-4 text-sm sm:text-[15px]">
              <li>
                <Link to="/evcs" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> Home
                </Link>
              </li>
              <li>
                <Link to="/evcs/about" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/evcs/products" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> Our Product
                </Link>
              </li>
              <li>
                <Link to="/evcs/contact" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> Dealership
                </Link>
              </li>
              <li>
                <Link to="/evcs/contact" className="text-slate-300 hover:text-white transition flex items-center gap-2 font-medium">
                  <span className="text-[#35C759] font-bold">»</span> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/ev" className="text-[#4D9900] hover:text-[#6ec821] font-bold transition flex items-center gap-2 pt-1">
                  <span className="text-[#4D9900] font-bold">»</span> EV Scooters & Auto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-5" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
            <h4 className="text-white font-extrabold text-base sm:text-lg tracking-wider uppercase font-heading">
              Contact Us
            </h4>

            <div className="space-y-4 text-sm sm:text-[15px] text-slate-300">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#35C759] text-[#35C759] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-wrap gap-1.5 font-medium">
                  <a href="tel:07651912140" className="hover:text-white transition">07651912140</a>
                  <span>/</span>
                  <a href="tel:09305734389" className="hover:text-white transition">09305734389</a>
                </div>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#35C759] text-[#35C759] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:info@vivtronevcs.com" className="hover:text-white transition font-medium">
                  info@vivtronevcs.com
                </a>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#35C759] text-[#35C759] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="leading-relaxed">
                  <strong className="text-white">Corporate Office :</strong> G-70, Sector-63, Noida, U.P.-201301
                </p>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#35C759] text-[#35C759] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="leading-relaxed">
                  <strong className="text-white">Head office :</strong> Chand Saray, Gosaiganj, Near Amroha Dhaba, Infront of Old Cold Storage, Lucknow, U.P. - 226501
                </p>
              </div>
            </div>

            {/* Social Circular Icons with Interactive Hover Animation */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#35C759] hover:bg-[#2eb04f] text-black font-extrabold flex items-center justify-center text-sm transition-all duration-300 hover:scale-115 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#35C759]/40 active:scale-95 cursor-pointer"
                title="Facebook"
              >
                f
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#35C759] hover:bg-[#2eb04f] text-black font-extrabold flex items-center justify-center text-sm transition-all duration-300 hover:scale-115 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#35C759]/40 active:scale-95 cursor-pointer"
                title="Twitter / X"
              >
                𝕏
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#35C759] hover:bg-[#2eb04f] text-black font-extrabold flex items-center justify-center text-sm transition-all duration-300 hover:scale-115 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#35C759]/40 active:scale-95 cursor-pointer"
                title="LinkedIn"
              >
                in
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#35C759] hover:bg-[#2eb04f] text-black font-extrabold flex items-center justify-center text-sm transition-all duration-300 hover:scale-115 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#35C759]/40 active:scale-95 cursor-pointer"
                title="Instagram"
              >
                📷
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright White Container (Clean & Spacious) */}
      <div className="w-full bg-white text-slate-900 py-4 px-4 text-center text-xs sm:text-sm font-semibold rounded-t-2xl sm:rounded-t-3xl shadow-md">
        Copyright © {new Date().getFullYear()} Powered By Navodaya Growth Pvt Ltd
      </div>
    </footer>
  );
};
