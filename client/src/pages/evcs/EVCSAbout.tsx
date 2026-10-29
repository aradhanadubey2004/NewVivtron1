import React, { useEffect } from 'react';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { Award, CheckCircle2, TrendingUp } from 'lucide-react';
import AOS from 'aos';

export const EVCSAbout: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);
  const realLeadership = [
    {
      name: 'Suraj Kesarwani',
      role: 'Director Technical',
      image: '/images/evcs/2026/06/Director-Technical.jpg',
      imagePosition: 'center top',
      aos: 'fade-left',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    {
      name: 'Vivek Kumar Singh',
      role: 'Director Production',
      image: '/images/evcs/2026/06/Director-production.jpg',
      imagePosition: 'center 20%',
      aos: 'fade-right',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
    {
      name: 'Arvind Kumar',
      role: 'Director – Sales & Marketing',
      image: '/images/evcs/2026/06/Arvind-kumar.jpg',
      imagePosition: 'center 75%',
      aos: 'fade-up',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#082B59] selection:text-white">
      <EVCSNavbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div
            className="rounded-3xl overflow-hidden border border-slate-200 mb-14 relative bg-[#F1F5F9] shadow-md"
            data-aos="fade-down"
            data-aos-duration="900"
          >
            <div className="h-64 sm:h-80 w-full relative">
              <img
                src="/images/evcs/2026/05/Start-Charging-Smarter-Today-and-Power-Your-Journey.webp"
                alt="About Vivtron EVCS"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/40 to-transparent flex flex-col justify-end p-8 sm:p-12">
                <span className="text-white text-xs font-bold uppercase tracking-widest font-mono bg-[#082B59] px-3 py-1 rounded w-fit mb-2">
                  A Venture of Navodaya Growth Private Limited • Est. 2026
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-heading drop-shadow-md">
                  About Vivtron EVCS - Powering India’s Electric Journey
                </h1>
              </div>
            </div>
          </div>

          {/* Story & Company Overview from vivtronevcs.com */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-4" data-aos="fade-right" data-aos-duration="800">
              <span className="text-[#082B59] text-xs font-bold uppercase tracking-wider font-mono">
                Company Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#082B59] font-heading">
                Smart EV Charging for Every Journey
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vivtron EVCS is a venture of <strong>Navodaya Growth Private Limited</strong>, dedicated to delivering smart and reliable EV charging infrastructure solutions. Backed by the experience and vision of a diversified business group, we help accelerate the adoption of electric mobility through innovative, scalable, and sustainable charging solutions for homes, businesses, and public spaces.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We design and manufacture high-efficiency DC fast chargers (40kW, 60kW, and 120kW) along with destination AC charging setups, managed centrally through our proprietary EV-CMS platform.
              </p>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C759]" />
                  <span>In-House indigenous manufacturing with strict quality control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C759]" />
                  <span>OCPP 1.6J and 2.0.1 compliant cloud telemetry integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35C759]" />
                  <span>High-uptime highway corridors, fleet hubs, and society networks</span>
                </div>
              </div>
            </div>

            {/* EVCS Image */}
            <div
              className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative bg-[#F1F5F9]"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <img
                src="/images/evcs/2026/05/FastCharge-Express-01-1-768x512-1.webp"
                alt="Vivtron Fast Charging Station"
                className="w-full h-auto object-cover hover:scale-102 transition duration-500"
              />
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Deliver fast, smart, and sustainable EV charging solutions enhancing convenient electric mobility for every driver, fleet, and commercial host across India.
              </p>
            </div>

            <div
              className="p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 hover:border-[#082B59] shadow-sm hover:shadow-lg transition"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <div className="w-12 h-12 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-[#35C759]" />
              </div>
              <h3 className="text-2xl font-bold text-[#082B59] mb-3 font-heading">Our Vision</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Build a cleaner future through innovative, reliable, and accessible EV charging infrastructure for everyone, powering the transition to zero-emission transportation.
              </p>
            </div>
          </div>

          {/* Company Leadership Section */}
          <div className="mb-20 overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                <span className="text-[#082B59]">Company </span>
                <span className="text-[#35C759]">Leadership</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {realLeadership.map((leader, idx) => (
                <div
                  key={idx}
                  data-aos={leader.aos}
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic"
                  className="rounded-3xl bg-white border border-slate-100 p-4 sm:p-5 text-center flex flex-col items-center shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-[#082B59]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Photo Container */}
                  <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      style={{ objectPosition: (leader as any).imagePosition || 'center top' }}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Overlapping Name & Designation Badge */}
                  <div className="-mt-7 sm:-mt-8 relative z-10 w-[88%] sm:w-[84%] bg-[#F1F5F9] rounded-2xl py-3 px-4 shadow-sm border border-slate-200 text-center">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#082B59] tracking-tight font-heading leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-slate-600 mt-0.5">
                      {leader.role}
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center justify-center gap-2.5 mt-5 mb-2">
                    <a
                      href={leader.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#062042] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="Facebook"
                    >
                      f
                    </a>
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#062042] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="X / Twitter"
                    >
                      𝕏
                    </a>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#062042] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="LinkedIn"
                    >
                      in
                    </a>
                    <a
                      href={leader.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#082B59] hover:bg-[#062042] text-white flex items-center justify-center transition shadow-xs"
                      title="Instagram"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real Office Locations */}
          <div
            className="p-8 sm:p-10 rounded-3xl bg-[#F1F5F9] border border-slate-200 shadow-sm"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="mb-6">
              <span className="text-[#082B59] text-xs font-bold uppercase tracking-wider font-mono">Our Locations</span>
              <h3 className="text-2xl font-bold text-[#082B59] font-heading mt-1">
                Corporate & Head Office Facilities
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-700">
              <div
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs"
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="800"
              >
                <span className="font-bold text-sm text-[#082B59] block mb-2">Corporate Office (Noida)</span>
                <p className="text-slate-600 leading-relaxed mb-4">
                  G-70, Sector-63, Noida, Uttar Pradesh - 201301
                </p>
                <div className="space-y-1 text-slate-800">
                  <p><strong>Phone:</strong> 0120-4144584 / +91 8929933680</p>
                  <p><strong>Email:</strong> info@vivtronevcs.com</p>
                </div>
              </div>

              <div
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="800"
              >
                <span className="font-bold text-sm text-[#082B59] block mb-2">Head Office (Lucknow)</span>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Chand Saray, Gosaiganj, Near Amroha Dhaba, Infront of Old Cold Storage, Lucknow, Uttar Pradesh - 226501
                </p>
                <div className="space-y-1 text-slate-800">
                  <p><strong>Phone:</strong> +91 8929933680</p>
                  <p><strong>Email:</strong> support@vivtronevcs.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EVCSFooter />
    </div>
  );
};
