import React, { useState, useEffect } from 'react';
import { EVNavbar } from '../../components/ev/EVNavbar';
import { EVFooter } from '../../components/ev/EVFooter';
import { api } from '../../services/api';
import { MapPin, Phone, Mail, Clock, CheckCircle2, AlertCircle, Send, Sparkles, Building2 } from 'lucide-react';
import AOS from 'aos';

export const EVContact: React.FC = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Test Ride',
    model: 'ROVER (1000W)',
    stateCity: 'Noida, UP',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await api.public.submitInquiry({
        type: formData.inquiryType === 'Dealership' ? 'EV_DEALERSHIP' : 'TEST_DRIVE',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `Type: ${formData.inquiryType} | Model: ${formData.model} | Location: ${formData.stateCity} | Details: ${formData.message}`,
      });

      if (res.success) {
        setSuccessMsg(res.message);
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiryType: 'Test Ride',
          model: 'ROVER (1000W)',
          stateCity: 'Noida, UP',
          message: '',
        });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again or call our hotline.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fbf6] text-slate-800 flex flex-col selection:bg-[#4D9900] selection:text-white">
      <EVNavbar />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAF3E5] text-[#4D9900] text-xs font-bold uppercase tracking-wider font-mono">
              Get in Touch • Ride the Spirit of Bharat
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101828] mt-2 font-heading">
              Contact Vivtron EV & Dealership Network
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Book a personalized vehicle test ride, apply for authorized dealership rights, or speak directly with our corporate engineering teams in Noida.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Corporate Head Office Card */}
              <div
                data-aos="fade-right"
                data-aos-duration="800"
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF3E5] text-[#4D9900] flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#101828]">Head Office</h3>
                    <p className="text-xs text-slate-500">Vivtron Electric Vehicles</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#4D9900] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#101828] block mb-0.5">Corporate Headquarters</strong>
                      <span>G-71, Sector-63, Noida, Uttar Pradesh - 201301</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <div>
                      <strong className="text-[#101828] block mb-0.5">Telephone / Landline</strong>
                      <a href="tel:0120-4144584" className="hover:text-[#4D9900] transition">0120-4144584</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <div>
                      <strong className="text-[#101828] block mb-0.5">Direct Mobile</strong>
                      <a href="tel:+918929933680" className="hover:text-[#4D9900] transition">+91 8929933680</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <div>
                      <strong className="text-[#101828] block mb-0.5">Official Inquiries</strong>
                      <a href="mailto:info@vivtron.in" className="hover:text-[#4D9900] transition">info@vivtron.in</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <div>
                      <strong className="text-[#101828] block mb-0.5">Working Hours</strong>
                      <span>Monday - Saturday: 9:30 AM to 6:30 PM IST</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dealership Benefits Box */}
              <div
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-delay="150"
                className="p-6 rounded-2xl bg-[#EAF3E5]/70 border border-[#4D9900]/30 shadow-sm"
              >
                <div className="flex items-center gap-2 text-[#4D9900] mb-3">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-bold text-sm text-[#101828]">Why Become an Authorized Dealership?</h4>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <span>Exclusive territorial showroom distribution rights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <span>High gross dealer margins on both vehicles and spare parts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <span>Free service technician training & marketing collateral</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4D9900] shrink-0" />
                    <span>Financing tie-ups with Digiipay & leading NBFCs</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div
                data-aos="fade-left"
                data-aos-duration="900"
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl"
              >
                <h3 className="text-2xl font-bold text-[#101828] mb-1 font-heading">
                  Submit Your Booking or Inquiry
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Please provide your contact information below. Our dealership manager will get in touch within 2 business hours.
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
                        Inquiry Type <span className="text-[#4D9900]">*</span>
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                      >
                        <option value="Test Ride">Book a Test Ride</option>
                        <option value="Dealership">Apply for Authorized Dealership</option>
                        <option value="Fleet Purchase">Commercial Fleet Bulk Order</option>
                        <option value="General Inquiry">General / Customer Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Select Model of Interest
                      </label>
                      <select
                        value={formData.model}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                      >
                        <option value="ROVER (1000W)">ROVER (1000W Flagship)</option>
                        <option value="COOPER">COOPER Urban Scooter</option>
                        <option value="PLUTO">PLUTO Sport Commuter</option>
                        <option value="EVOQUE">EVOQUE Luxury Tourer</option>
                        <option value="COUPE">COUPE Compact</option>
                        <option value="MARTIN">MARTIN Rugged</option>
                        <option value="LOADEX">LOADEX (250+ Kg Commercial)</option>
                        <option value="NEXO AUTO">NEXO AUTO (Passenger Rickshaw)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Name <span className="text-[#4D9900]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Phone Number <span className="text-[#4D9900]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email Address <span className="text-[#4D9900]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        State & City <span className="text-[#4D9900]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.stateCity}
                        onChange={(e) => setFormData({ ...formData, stateCity: e.target.value })}
                        placeholder="e.g. Noida, Uttar Pradesh"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Message / Special Requests
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention your preferred test ride time or showroom location..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-800 text-xs focus:outline-none focus:border-[#4D9900] focus:ring-1 focus:ring-[#4D9900]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-[#4D9900] hover:bg-[#438300] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#4D9900]/25 transition hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Booking Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EVFooter />
    </div>
  );
};
