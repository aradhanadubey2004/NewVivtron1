import React, { useState, useEffect } from 'react';
import { EVCSNavbar } from '../../components/evcs/EVCSNavbar';
import { EVCSFooter } from '../../components/evcs/EVCSFooter';
import { api } from '../../services/api';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send, Sparkles, Building2 } from 'lucide-react';
import AOS from 'aos';

export const EVCSContact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Commercial Retail Plaza',
    estimatedBays: '4-8 Bays',
    location: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await api.public.submitInquiry({
        type: 'EVCS_STATION_HOST',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Property Type: ${formData.propertyType} | Bays: ${formData.estimatedBays} | Location: ${formData.location} | Details: ${formData.message}`,
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: 'Commercial Retail Plaza',
          estimatedBays: '4-8 Bays',
          location: '',
          message: '',
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again or call our helpline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col selection:bg-[#082B59] selection:text-white">
      <EVCSNavbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
            <span className="text-[#082B59] text-xs font-bold uppercase tracking-wider font-mono">
              Franchise & Station Host Partnership • Navodaya Growth Pvt Ltd
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#082B59] mt-2 font-heading">
              Contact Vivtron EVCS Infrastructure
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Host a DC fast charging superhub at your commercial property, apply for an authorized EVCS dealership, or speak directly with our infrastructure engineering team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Official Offices from vivtronevcs.com */}
              <div
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="800"
                className="p-6 sm:p-8 rounded-3xl bg-[#F1F5F9] border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#082B59]/10 text-[#082B59] flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#35C759]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#082B59]">Vivtron EVCS Offices</h3>
                    <p className="text-xs text-slate-500 font-medium">A Venture of Navodaya Growth Pvt Ltd</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#35C759] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Corporate Office (Noida)</strong>
                      <span>G-70, Sector-63, Noida, Uttar Pradesh - 201301</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#35C759] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Head Office (Lucknow)</strong>
                      <span>Chand Saray, Gosaiganj, Near Amroha Dhaba, Infront of Old Cold Storage, Lucknow, U.P. - 226501</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#35C759] shrink-0" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Mobile Hotline</strong>
                      <a href="tel:+918929933680" className="hover:text-[#082B59] font-bold transition">+91 8929933680</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#35C759] shrink-0" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Landline / Corporate Desk</strong>
                      <a href="tel:0120-4144584" className="hover:text-[#082B59] transition">0120-4144584</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#35C759] shrink-0" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Email Communications</strong>
                      <a href="mailto:info@vivtronevcs.com" className="hover:text-[#082B59] transition">info@vivtronevcs.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#35C759] shrink-0" />
                    <div>
                      <strong className="text-slate-900 block mb-0.5">Hours of Operation</strong>
                      <span>Monday - Saturday: 9:00 AM to 7:00 PM IST (NOC 24/7)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dealership Benefits Box */}
              <div
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="800"
                className="p-6 rounded-2xl bg-[#F1F5F9] border-2 border-[#082B59]/20 shadow-sm"
              >
                <div className="flex items-center gap-2 text-[#082B59] mb-3">
                  <Sparkles className="w-5 h-5 text-[#35C759]" />
                  <h4 className="font-bold text-sm text-[#082B59]">Vivtron EVCS Dealership Model</h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" />
                    <span>Smart Business, Sustainable Future with guaranteed ROI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" />
                    <span>In-house manufactured 40kW, 60kW, and 120kW chargers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" />
                    <span>Automated EV-CMS portal handles payments and driver billing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#35C759] shrink-0" />
                    <span>Complete turnkey setup: civil, grid connection, commissioning</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7" data-aos="fade-left" data-aos-duration="800">
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-bold text-[#082B59] mb-1 font-heading">
                  Submit Host or Dealership Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Please provide your property or business details below. A dedicated EVCS infrastructure director will follow up within 2 hours.
                </p>

                {successMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2.5">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Inquiry Category <span className="text-[#082B59]">*</span>
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                      >
                        <option value="Vivtron EVCS Dealership Franchise">Vivtron EVCS Dealership Franchise</option>
                        <option value="Commercial Retail Plaza / Mall">Commercial Retail Plaza / Mall</option>
                        <option value="Highway Superhub / Fuel Station">Highway Superhub / Fuel Station</option>
                        <option value="Residential Society / RWA">Residential Society / RWA</option>
                        <option value="Commercial Fleet Depot">Commercial Fleet Depot</option>
                        <option value="Hardware Purchase Only">Hardware Purchase (40kW/60kW/120kW)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Planned Charging Bays
                      </label>
                      <select
                        value={formData.estimatedBays}
                        onChange={(e) => setFormData({ ...formData, estimatedBays: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                      >
                        <option value="2-4 Bays (Entry Hub)">2-4 Bays (Entry Hub)</option>
                        <option value="4-8 Bays (Standard Commercial)">4-8 Bays (Standard Commercial)</option>
                        <option value="8-16 Bays (Highway Superhub)">8-16 Bays (Highway Superhub)</option>
                        <option value="20+ Bays (Major Transit Plaza)">20+ Bays (Major Transit Plaza)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Contact Person Name <span className="text-[#082B59]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Arvind Verma"
                        className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Phone Number <span className="text-[#082B59]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-[#082B59]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@business.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Proposed City & Site Address <span className="text-[#082B59]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Lucknow / Noida Highway Corridor"
                        className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Project Notes / Available Power Capacity
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention your existing electrical transformer capacity, parking footfall, or specific timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F1F5F9] border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#082B59] focus:ring-1 focus:ring-[#082B59]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#082B59] hover:bg-[#062042] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#082B59]/25 transition hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <span>Submitting Proposal...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#35C759]" />
                        <span>Submit Site Host Application</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EVCSFooter />
    </div>
  );
};
