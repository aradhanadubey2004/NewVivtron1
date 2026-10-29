import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProductPurchaseView: React.FC = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.name || 'NAVODAYA GROWTH PVT.LTD');
  const [email, setEmail] = useState(user?.email || 'info@vivtronevcs.com');
  const [mobileNumber, setMobileNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [state, setState] = useState('');
  const [product, setProduct] = useState('');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!product) {
      setFeedback({ type: 'error', message: 'Please select a product to purchase.' });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFeedback({
        type: 'success',
        message: `Order request for ${product} placed successfully! Our billing and hardware deployment team will contact you shortly.`,
      });
      setProduct('');
    }, 600);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1D37] font-heading mb-6">
          Product Purchase
        </h2>

        {feedback && (
          <div
            className={`mb-6 p-4 rounded-xl text-xs font-medium flex items-center gap-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: Full Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              />
            </div>
          </div>

          {/* Row 2: Mobile Number & PAN Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Mobile Number"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">PAN Number</label>
              <input
                type="text"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                placeholder="PAN Number"
                maxLength={10}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition uppercase font-mono"
              />
            </div>
          </div>

          {/* Row 3: GST Number & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">GST Number</label>
              <input
                type="text"
                value={gstNumber}
                onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                placeholder="GST Number"
                maxLength={15}
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition uppercase font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
              />
            </div>
          </div>

          {/* Row 4: Select Product */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">Select Product</label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            >
              <option value="">Select Product</option>
              <option value="Vivtron 40kW DC Fast Charger - ₹4,50,000">
                Vivtron 40kW DC Fast Charger - ₹4,50,000
              </option>
              <option value="Vivtron 60kW Dual Gun Supercharger - ₹6,80,000">
                Vivtron 60kW Dual Gun Supercharger - ₹6,80,000
              </option>
              <option value="Vivtron 120kW Ultra-Fast Highway Dispenser - ₹12,50,000">
                Vivtron 120kW Ultra-Fast Highway Dispenser - ₹12,50,000
              </option>
              <option value="Vivtron 22kW Commercial AC Dual Gun - ₹95,000">
                Vivtron 22kW Commercial AC Dual Gun - ₹95,000
              </option>
              <option value="Vivtron 7.4kW Residential Smart Wallbox - ₹48,000">
                Vivtron 7.4kW Residential Smart Wallbox - ₹48,000
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-[#1D61E7] hover:bg-[#1554CB] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1D61E7]/25 transition hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
