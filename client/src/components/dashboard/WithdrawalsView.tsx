import React, { useState } from 'react';
import { Wallet, CheckCircle2, AlertCircle } from 'lucide-react';

export const WithdrawalsView: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [history, setHistory] = useState<any[]>([]);

  const handleWithdrawal = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setFeedback({ type: 'error', message: 'Please enter a valid withdrawal amount.' });
      return;
    }

    if (numAmount > walletBalance) {
      setFeedback({
        type: 'error',
        message: 'Insufficient wallet balance. Minimum withdrawal balance must be available.',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setWalletBalance((prev) => prev - numAmount);
      const newEntry = {
        id: `WTH-${Date.now().toString().slice(-6)}`,
        amount: `₹${numAmount.toLocaleString()}`,
        status: 'Pending Approval',
        date: new Date().toLocaleDateString('en-GB'),
      };
      setHistory([newEntry, ...history]);
      setFeedback({
        type: 'success',
        message: `Withdrawal request of ₹${numAmount} submitted to accounts department.`,
      });
      setAmount('');
    }, 600);
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
        {/* ================= SECTION 1: WITHDRAWAL REQUEST ================= */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1D37] font-heading mb-3">
            Withdrawal Request
          </h2>

          <div className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-1.5">
            <span>Wallet Balance:</span>
            <span className="font-mono text-emerald-600 font-extrabold">₹{walletBalance.toLocaleString()}</span>
          </div>

          {feedback && (
            <div
              className={`mb-4 p-3.5 rounded-xl text-xs font-medium flex items-center gap-2 ${
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

          <form onSubmit={handleWithdrawal} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to withdraw (₹)"
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-[#1D61E7] hover:bg-[#1554CB] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#1D61E7]/25 transition hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Submit Withdrawal'}
            </button>
          </form>
        </div>

        {/* Divider matching Screenshot 4 */}
        <hr className="border-t border-slate-200" />

        {/* ================= SECTION 2: WITHDRAWAL HISTORY ================= */}
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0A1D37] font-heading mb-4">
            Withdrawal History
          </h3>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#EBF3FB] text-[11px] font-bold text-[#0A264D] uppercase tracking-wider font-mono border-b border-slate-200">
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">AMOUNT</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 px-4">DATE</th>
                </tr>
              </thead>
              <tbody>
                {history.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-500 font-medium text-sm">
                      No Withdrawal Found
                    </td>
                  </tr>
                ) : (
                  history.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 text-xs">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">{item.id}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-emerald-600">{item.amount}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{item.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
