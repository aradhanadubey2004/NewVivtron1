import React, { useEffect } from 'react';
import { EVNavbar } from '../../components/ev/EVNavbar';
import { EVFooter } from '../../components/ev/EVFooter';
import { Target, Leaf, Award, MapPin, Phone, Mail, CheckCircle2, Sparkles } from 'lucide-react';
import AOS from 'aos';

export const EVAbout: React.FC = () => {
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
      aos: 'fade-up',
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
      aos: 'fade-right',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-800 flex flex-col selection:bg-[#4D9900] selection:text-white">
      <EVNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner with Real Image */}
          <div className="rounded-3xl overflow-hidden border border-slate-200 mb-14 relative bg-[#EAF3E5] shadow-md">
            <div className="h-64 sm:h-80 w-full relative">
              <img
                src="/images/about-us-header.jpg"
                alt="About Vivtron Header"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent flex flex-col justify-end p-8 sm:p-12">
                <span className="text-[#4D9900] text-xs font-bold uppercase tracking-widest font-mono bg-white/95 px-3 py-1 rounded-full w-fit mb-2 shadow-xs">
                  Est. 2016 • Ride the Spirit of Bharat
                </span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1 font-heading drop-shadow-md">
                  About Vivtron - Ride the Spirit of Bharat
                </h1>
              </div>
            </div>
          </div>

          {/* Real Company Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-4">
              <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">
                Our Story & Vision
              </span>
              <h2 className="text-3xl font-extrabold text-[#101828] font-heading">
                Accelerating India’s Clean Mobility Transition
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vivtron is committed to driving a cleaner and greener future through innovative solutions in electric mobility and renewable energy by developing sustainable transportation and harnessing clean power sources.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vivtron is a passionate and dynamic brand that blends Indian culture, innovation, and modern mobility. Our mission is to carry forward the spirit of Bharat by providing people with reliable, efficient, and sustainable travel and power solutions.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                We aim to reduce carbon emissions, protect our planet, and inspire a shift towards eco-friendly living. Our vision is to create a world where technology and nature work hand in hand for a healthier, sustainable earth.
              </p>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D9900]" />
                  <span>Climate-tech electric vehicle manufacturing with a sustainable approach</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D9900]" />
                  <span>Exceptional quality control and dedicated after-sales service network</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4D9900]" />
                  <span>Backed by Digiipay financial technology ecosystems</span>
                </div>
              </div>
            </div>

            {/* Real About Photo */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl relative bg-white">
              <img
                src="/images/abutimg.jpg"
                alt="Vivtron Team and Factory"
                className="w-full h-auto object-cover hover:scale-102 transition duration-500"
              />
            </div>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="100"
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Ride the Spirit of Bharat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our vehicles are engineered specifically for Indian road conditions, varied climates, and high-frequency daily commutes with zero emissions.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="200"
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Clean Green Future</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transitioning fossil fuel dependency to clean electric power, reducing urban smog, and cutting per-kilometer operating costs to under 25 paise.
              </p>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="900"
              data-aos-delay="300"
              className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#4D9900] shadow-sm hover:shadow-lg transition"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#101828] mb-2 font-heading">Unmatched After-Sales</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Addressing EV industry challenges through genuine spare parts availability, rapid service turnaround, and trained technician networks.
              </p>
            </div>
          </div>

          {/* Company Leadership Section */}
          <div className="mb-20 overflow-hidden">
            <div className="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight">
                <span className="text-[#101828]">Company </span>
                <span className="text-[#4D9900]">Leadership</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {realLeadership.map((leader, idx) => (
                <div
                  key={idx}
                  data-aos={leader.aos}
                  data-aos-duration="1000"
                  data-aos-easing="ease-out-cubic"
                  className="rounded-3xl bg-white border border-slate-200 p-4 sm:p-5 text-center flex flex-col items-center shadow-md shadow-slate-200/40 hover:shadow-xl hover:shadow-[#4D9900]/10 hover:-translate-y-1 transition-all duration-300"
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
                    <h3 className="text-base sm:text-lg font-extrabold text-[#101828] tracking-tight font-heading leading-tight">
                      {leader.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#4D9900] mt-0.5">
                      {leader.role}
                    </p>
                  </div>

                  {/* Social Media Links */}
                  <div className="flex items-center justify-center gap-2.5 mt-5 mb-2">
                    <a
                      href={leader.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="Facebook"
                    >
                      f
                    </a>
                    <a
                      href={leader.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="X / Twitter"
                    >
                      𝕏
                    </a>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white font-bold flex items-center justify-center text-xs transition shadow-xs"
                      title="LinkedIn"
                    >
                      in
                    </a>
                    <a
                      href={leader.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full bg-[#101828] hover:bg-[#4D9900] text-white flex items-center justify-center transition shadow-xs"
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

          {/* Headquarters Info Strip */}
          <div
            data-aos="fade-up"
            data-aos-duration="900"
            className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
          >
            <div className="space-y-2">
              <span className="text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">
                Corporate Headquarters
              </span>
              <h3 className="text-2xl font-bold text-[#101828] font-heading">Vivtron Motors Pvt. Ltd.</h3>
              <p className="text-xs text-slate-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4D9900] shrink-0" />
                <span>G-71, Sector-63, Noida, Uttar Pradesh - 201301</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:0120-4144584"
                className="px-5 py-3 rounded-xl bg-[#EAF3E5] hover:bg-[#d8edd0] text-[#101828] text-xs font-bold flex items-center gap-2 border border-slate-200 shadow-sm"
              >
                <Phone className="w-4 h-4 text-[#4D9900]" />
                <span>0120-4144584</span>
              </a>
              <a
                href="mailto:info@vivtron.in"
                className="px-5 py-3 rounded-xl bg-[#4D9900] hover:bg-[#408000] text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-[#4D9900]/20"
              >
                <Mail className="w-4 h-4" />
                <span>info@vivtron.in</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <EVFooter />
    </div>
  );
};
