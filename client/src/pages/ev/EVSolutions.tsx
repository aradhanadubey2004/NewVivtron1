import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVNavbar } from '../../components/ev/EVNavbar';
import { EVFooter } from '../../components/ev/EVFooter';
import { Truck, Home, Cpu, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import AOS from 'aos';

export const EVSolutions: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-800 flex flex-col selection:bg-[#4D9900] selection:text-white">
      <EVNavbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl" data-aos="fade-up" data-aos-duration="800">
            <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">Enterprise & Consumer Ecosystems</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101828] mt-2 font-heading">
              Tailored Electric Mobility Solutions
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              From commercial fleet total cost of ownership reduction to residential vehicle-to-home bi-directional power systems, Vivtron empowers organizations and individuals to lead the decarbonization revolution.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Solution 1 */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-xl hover:shadow-[#4D9900]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#101828] mb-3 font-heading">Commercial Fleet Electrification</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Turn delivery operations into zero-emission profit centers. Vivtron Fleet integrates custom delivery vans with depot charging infrastructure and real-time battery analytics to cut total cost of ownership by up to 65%.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Automated nightly depot charge scheduling</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Real-time route range optimization with payload compensation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Enterprise telematics API with SAP & Samsara integrations</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/ev/contact')}
                className="w-full py-3 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#4D9900]/20 cursor-pointer"
              >
                <span>Request Fleet Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Solution 2 */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="200"
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-xl hover:shadow-[#4D9900]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#101828] mb-3 font-heading">Residential Vehicle-to-Home (V2H)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Your vehicle is a 118 kWh mobile microgrid. During peak utility rates or power grid blackouts, Vivtron Bi-Directional Inverters power your entire home for up to 7 consecutive days without noise or emissions.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Millisecond grid-islanding during power outages</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Peak shaving algorithm reduces monthly electric utility bills</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Solar PV canopy integration with dual MPPT controllers</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/ev/contact')}
                className="w-full py-3 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#4D9900]/20 cursor-pointer"
              >
                <span>Explore Home Energy Kits</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Solution 3 */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-xl hover:shadow-[#4D9900]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#101828] mb-3 font-heading">Autonomous Mobility as a Service</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Next-generation corporate campus shuttles and urban ride-hail pods equipped with Level 4 sensor suites, redundant steer-by-wire, and centralized fleet dispatch orchestration.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Multi-camera 360-degree perimeter vision perception</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> HD map-free localization in geo-fenced campus districts</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Remote operator teleoperation takeover capabilities</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/ev/contact')}
                className="w-full py-3 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#4D9900]/20 cursor-pointer"
              >
                <span>Book Campus Demonstration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Solution 4 */}
            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="400"
              className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-xl hover:shadow-[#4D9900]/10 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#101828] mb-3 font-heading">Commercial Real Estate Charging</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  Attract premium tenants and increase property asset valuation with turnkey EV amenities. We handle grid interconnection, load management software, and dynamic billing splits.
                </p>
                <ul className="space-y-2.5 text-xs text-slate-700 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Zero upfront capital expenditure leasing models</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Real-time sub-metering and automated tenant billing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#4D9900]" /> Dynamic load management prevents transformer upgrades</li>
                </ul>
              </div>
              <button
                onClick={() => navigate('/ev/contact')}
                className="w-full py-3 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-[#4D9900]/20 cursor-pointer"
              >
                <span>Partner With Vivtron</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <EVFooter />
    </div>
  );
};
