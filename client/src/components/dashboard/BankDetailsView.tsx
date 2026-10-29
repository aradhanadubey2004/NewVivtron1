import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Building2 } from 'lucide-react';

export const BankDetailsView: React.FC = () => {
  const [accountHolder, setAccountHolder] = useState('NAVODAYA GROWTH PVT.LTD');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [accountNumber, setAccountNumber] = useState('50200012348921');
  const [ifscCode, setIfscCode] = useState('HDFC0001234');

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!accountHolder.trim() || !bankName.trim() || !accountNumber.trim() || !ifscCode.trim()) {
      setFeedback({ type: 'error', message: 'All fields are required.' });
      return;
    }

    if (accountNumber.trim().length < 8) {
      setFeedback({ type: 'error', message: 'Please enter a valid Account Number (min 8 digits).' });
      return;
    }

    if (ifscCode.trim().length !== 11) {
      setFeedback({ type: 'error', message: 'IFSC Code must be exactly 11 characters (e.g. HDFC0001234).' });
      return;
    }

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setFeedback({
        type: 'success',
        message: 'Bank details saved and verified successfully.',
      });
    }, 600);
  };

  return (
    <div className="w-full">
      {/* Centered Main Card Matching User Screenshot */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-3xl mx-auto">
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

        <form onSubmit={handleSave} className="space-y-6">
          {/* Account Holder Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Account Holder Name
            </label>
            <input
              type="text"
              value={accountHolder}
              onChange={(e) => setAccountHolder(e.target.value)}
              placeholder="Enter Account Holder Name"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>

          {/* Bank Name */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter Bank Name"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition"
            />
          </div>

          {/* Account Number */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter Account Number"
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition font-mono"
            />
          </div>

          {/* IFSC Code */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-800">
              IFSC Code
            </label>
            <input
              type="text"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              placeholder="Enter IFSC Code"
              maxLength={11}
              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition uppercase font-mono"
            />
          </div>

          {/* Save Bank Details Button (Exact Red Color from Screenshot) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-lg bg-[#E50914] hover:bg-[#CC0812] active:bg-[#B30710] text-white font-bold text-xs sm:text-sm shadow-sm transition hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Bank Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
