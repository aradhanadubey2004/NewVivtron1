import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { ShieldCheck, Cpu, Wrench, Radio, Activity, CheckCircle2, ArrowRight, Smartphone, Server } from 'lucide-react';
import AOS from 'aos';

export const EVCSServices: React.FC = () => {
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
              Professional EV Charging Services • Navodaya Growth Pvt Ltd
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#082B59] mt-2 font-heading">
              End-to-End EVCS Infrastructure Services
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              We manage every stage of the charging infrastructure lifecycle—from in-house charger manufacturing and site electrical interconnection to our intelligent EV-CMS cloud platform, driver mobile app, and nationwide maintenance.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <Wrench className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-xl font-bold text-[#082B59] mb-2 font-heading">In-House Manufacturing</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Innovative EV charger manufacturing delivering durable, efficient, smart, and sustainable 40kW, 60kW, and 120kW fast-charging hardware engineered for Indian climates.
              </p>
            </div>

            {/* Service 2 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <Server className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-xl font-bold text-[#082B59] mb-2 font-heading">Advanced EV-CMS Platform</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Customer CMS for live EV charging and revenue tracking. Enables smart monitoring, remote management, seamless billing operations, and automated telemetry.
              </p>
            </div>

            {/* Service 3 */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-xl font-bold text-[#082B59] mb-2 font-heading">Smart EV Mobile App</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Driver app offering real-time station availability, turn-by-turn navigation, instant remote charging start/stop, digital wallet payments, and receipts.
              </p>
            </div>

            {/* Service 4 */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <Radio className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-xl font-bold text-[#082B59] mb-2 font-heading">24/7 Cloud NOC Monitoring</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Automated OCPP 1.6J and 2.0.1 station heartbeats. Continuous voltage, current, and temperature telemetry detect anomalies before interruptions occur.
              </p>
            </div>

            {/* Service 5 */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-xl font-bold text-[#082B59] mb-2 font-heading">Preventive Field Maintenance</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Guaranteed technician SLA response time for critical faults, regular connector inspections, filter cleanings, and emergency spare-parts dispatch.
              </p>
            </div>

            {/* Service 6 */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="800"
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <Activity className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-xl font-bold text-[#082B59] mb-2 font-heading">Franchise & Dealership Network</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vivtron EVCS Dealership empowers entrepreneurs with high-margin recurring income from every kWh dispensed, with zero software maintenance overhead.
              </p>
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="mt-14 p-8 sm:p-12 rounded-3xl bg-[#F1F5F9] border-2 border-[#082B59]/20 text-center shadow-md"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#082B59] font-heading">
              Ready to Power Your Location with Vivtron EVCS?
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto text-sm">
              Our engineering team will conduct a free site electrical assessment and provide an estimated ROI forecast for your commercial or residential property.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/evcs/contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white font-bold text-sm shadow-md shadow-[#082B59]/25 transition cursor-pointer"
              >
                Request Free Site Assessment
              </button>
              <button
                onClick={() => navigate('/evcs/products')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition cursor-pointer"
              >
                View Charger Lineup
              </button>
            </div>
          </div>
        </div>
      </main>

      <EVCSFooter />
    </div>
  );
};
