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
              className="p-6 sm:p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-2xl hover:shadow-[#082B59]/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Real Solution Image with Badges */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-slate-200/90 shadow-sm bg-slate-200">
                  <img
                    src="/images/evcs-solutions/fleet-charging.jpg"
                    alt="Commercial Fleet Charging Depot"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#082B59] text-xs font-bold shadow-md">
                    <Truck className="w-3.5 h-3.5 text-[#35C759]" />
                    <span>Fleet & Depot</span>
                  </div>

                  <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#082B59]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-sm">
                    40kW - 120kW DC Fast
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading group-hover:text-[#062042] transition-colors">
                  Commercial Fleet Charging
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Efficient fleet charging solutions ensuring fast, scalable, reliable, and smart power management for commercial logistics, passenger autos, e-buses, and last-mile delivery vans.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> 40kW to 120kW multi-gun DC fast charging stations</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Automated overnight depot charge scheduling and peak shaving</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Real-time telematics API for driver authentication and battery health tracking</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 hover:shadow-lg hover:shadow-[#082B59]/30 active:scale-[0.99] cursor-pointer"
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
              className="p-6 sm:p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-2xl hover:shadow-[#082B59]/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Real Solution Image with Badges */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-slate-200/90 shadow-sm bg-slate-200">
                  <img
                    src="/images/evcs-solutions/residential-charging.jpg"
                    alt="Residential Society EV Charging"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#082B59] text-xs font-bold shadow-md">
                    <Home className="w-3.5 h-3.5 text-[#35C759]" />
                    <span>Societies & RWA</span>
                  </div>

                  <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#082B59]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-sm">
                    3.3kW - 22kW AC Smart
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading group-hover:text-[#062042] transition-colors">
                  Residential Societies & Apartments
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Smart, cost-effective EV charging infrastructure designed for residential welfare associations (RWA), high-rise societies, and gated communities.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Individual resident RFID tap & pay with automated sub-metering</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Dynamic load management prevents society transformer overloads</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Zero billing headaches: Society receives automated revenue splits</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 hover:shadow-lg hover:shadow-[#082B59]/30 active:scale-[0.99] cursor-pointer"
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
              className="p-6 sm:p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-2xl hover:shadow-[#082B59]/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Real Solution Image with Badges */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-slate-200/90 shadow-sm bg-slate-200">
                  <img
                    src="/images/evcs-solutions/retail-mall-charging.jpg"
                    alt="Retail Malls, Hotels & Restaurants Charging"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#082B59] text-xs font-bold shadow-md">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#35C759]" />
                    <span>Retail & Hospitality</span>
                  </div>

                  <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#082B59]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-sm">
                    60kW Dual CCS2 Guns
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading group-hover:text-[#062042] transition-colors">
                  Retail Malls, Hotels & Restaurants
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Attract high-spending EV drivers to your commercial shopping center, restaurant, or hotel. Drivers dwell longer, spend more, and generate continuous monthly revenue.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> 60kW urban fast chargers with dual CCS2 guns</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Integrated mobile app listing on Google Maps and Vivtron App</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> Turnkey installation: site survey, civil work, electrical setup, CMS</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 hover:shadow-lg hover:shadow-[#082B59]/30 active:scale-[0.99] cursor-pointer"
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
              className="p-6 sm:p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-2xl hover:shadow-[#082B59]/15 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Real Solution Image with Badges */}
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-slate-200/90 shadow-sm bg-slate-200">
                  <img
                    src="/images/evcs-solutions/highway-supercharger.jpg"
                    alt="Highway Supercharging Hubs"
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/10" />

                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-[#082B59] text-xs font-bold shadow-md">
                    <Zap className="w-3.5 h-3.5 text-[#35C759]" />
                    <span>Highway Corridors</span>
                  </div>

                  <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-md bg-[#082B59]/90 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-white/20 shadow-sm">
                    120kW - 240kW Ultra Fast
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading group-hover:text-[#062042] transition-colors">
                  Highway Supercharging Hubs
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  High-throughput expressway charging plazas designed for major intercity corridors across national and state highways.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> 120kW continuous rapid charging delivers 80% charge in ~25 minutes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> 24/7 automated telemetry with cloud-based remote fault recovery</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" /> High profitability franchise dealership model</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full py-3.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#082B59]/20 hover:shadow-lg hover:shadow-[#082B59]/30 active:scale-[0.99] cursor-pointer"
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
