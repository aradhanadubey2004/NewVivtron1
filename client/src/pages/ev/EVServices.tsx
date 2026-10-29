import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EVNavbar } from '../../components/ev/EVNavbar';
import { EVFooter } from '../../components/ev/EVFooter';
import { Radio, Wrench, ShieldCheck, Headphones, Palette, Sparkles, ArrowRight } from 'lucide-react';

export const EVServices: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-800 flex flex-col selection:bg-[#4D9900] selection:text-white">
      <EVNavbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">Ownership Experience</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101828] mt-2 font-heading">
              World-Class Service at Every Mile
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Owning a Vivtron means effortless convenience. With continuous over-the-air improvements, mobile concierge vans that come to your driveway, and an 8-year comprehensive battery warranty.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Over-The-Air Upgrades</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your vehicle evolves over time. Receive regular software updates while you sleep that improve acceleration, optimize battery thermal algorithms, and unlock new autonomous driving capabilities.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Mobile Service Valet</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Skip dealership waiting rooms. Over 80% of routine maintenance (tire rotations, cabin air filtration, sensor calibrations) is completed right in your driveway by certified Vivtron Mobile Technicians.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Battery Shield Warranty</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enjoy 8-year or 150,000-mile guaranteed battery health protection. If capacity drops below 75%, our service centers provide cell rebalancing or replacement free of charge.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">24/7 Roadside Telematics</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Connected telematics continuously monitor tire pressures, brake wear, and 12V auxiliary system health. If an anomaly is detected, dispatch is notified before you even notice.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Vivtron Atelier Customization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Work directly with our design studio to customize your vehicle. Choose bespoke vegan leather interior colorways, custom forged wheel finishes, and personalized threshold kick-plates.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Certified Pre-Owned Program</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every trade-in undergoes a rigorous 160-point mechanical inspection, complete battery pack capacity benchmarking, and receives an extended 2-year factory bumper-to-bumper warranty.
              </p>
            </div>
          </div>

          <div className="mt-14 p-8 sm:p-12 rounded-3xl bg-white border-2 border-[#4D9900]/30 text-center shadow-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] font-heading">
              Ready to Experience the Vivtron Advantage?
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm">
              Schedule your personalized private test drive at your nearest showroom or have our mobile product specialist bring a vehicle directly to your residence.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/ev/contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white font-bold text-sm shadow-md shadow-[#4D9900]/25 transition cursor-pointer"
              >
                Schedule Drive Experience
              </button>
              <button
                onClick={() => navigate('/ev/products')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-[#EAF3E5] text-[#101828] font-bold text-sm border border-slate-300 shadow-sm transition cursor-pointer"
              >
                View Vehicle Specs
              </button>
            </div>
          </div>
        </div>
      </main>

      <EVFooter />
    </div>
  );
};
