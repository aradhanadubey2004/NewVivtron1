import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { Zap, Building, ShoppingBag, Truck, Home, ArrowRight, CheckCircle2, Server, Smartphone } from 'lucide-react';
import AOS from 'aos';

export const EVCSSolutions: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#082B59] selection:text-white">
      <EVCSNavbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-aos="fade-up" data-aos-duration="800">
            <span className="text-[#082B59] text-xs font-bold uppercase tracking-wider font-mono">
              Turnkey Deployment Models • Navodaya Growth Pvt Ltd
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#082B59] mt-2 font-heading">
              Smart EV Charging Solutions for Modern Spaces
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Whether you are a commercial property owner seeking to monetize parking spaces, a residential society committee member, or a logistics fleet manager electrifying delivery vehicles, Vivtron provides complete end-to-end charging solutions.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1: Fleet Charging */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6 text-[#35C759]" />
                </div>
                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading">Commercial Fleet Charging</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Efficient fleet charging solutions ensuring fast, scalable, reliable, and smart power management for commercial logistics, passenger autos, e-buses, and last-mile delivery vans.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> 40kW to 120kW multi-gun DC fast charging stations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Automated overnight depot charge scheduling and peak shaving</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Real-time telematics API for driver authentication and battery health tracking</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 cursor-pointer"
              >
                <span>Inquire About Fleet Solutions</span>
                <ArrowRight className="w-4 h-4 text-[#35C759]" />
              </button>
            </div>

            {/* Solution 2: Residential Societies & Apartments */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                  <Home className="w-6 h-6 text-[#35C759]" />
                </div>
                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading">Residential Societies & Apartments</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Smart, cost-effective EV charging infrastructure designed for residential welfare associations (RWA), high-rise societies, and gated communities.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Individual resident RFID tap & pay with automated sub-metering</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Dynamic load management prevents society transformer overloads</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Zero billing headaches: Society receives automated revenue splits</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 cursor-pointer"
              >
                <span>Request Society Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#35C759]" />
              </button>
            </div>

            {/* Solution 3: Commercial Malls & Hotels */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                  <ShoppingBag className="w-6 h-6 text-[#35C759]" />
                </div>
                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading">Retail Malls, Hotels & Restaurants</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Attract high-spending EV drivers to your commercial shopping center, restaurant, or hotel. Drivers dwell longer, spend more, and generate continuous monthly revenue.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> 60kW urban fast chargers with dual CCS2 guns</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Integrated mobile app listing on Google Maps and Vivtron App</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> Turnkey installation: site survey, civil work, electrical setup, CMS</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 cursor-pointer"
              >
                <span>Commercial Host Application</span>
                <ArrowRight className="w-4 h-4 text-[#35C759]" />
              </button>
            </div>

            {/* Solution 4: Highway Supercharging Hubs */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-xl hover:shadow-[#082B59]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-[#35C759]" />
                </div>
                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading">Highway Supercharging Hubs</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  High-throughput expressway charging plazas designed for major intercity corridors across national and state highways.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> 120kW continuous rapid charging delivers 80% charge in ~25 minutes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> 24/7 automated telemetry with cloud-based remote fault recovery</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759]" /> High profitability franchise dealership model</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 cursor-pointer"
              >
                <span>Highway Plaza Partnership</span>
                <ArrowRight className="w-4 h-4 text-[#35C759]" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <EVCSFooter />
    </div>
  );
};
