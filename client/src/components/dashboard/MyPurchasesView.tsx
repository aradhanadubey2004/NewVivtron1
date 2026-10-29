import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MyPurchasesView: React.FC<{ isAdmin?: boolean }> = ({ isAdmin = false }) => {
  const navigate = useNavigate();

  // Purchases list (empty state matching screenshot 2)
  const purchases: any[] = [];

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-5xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1D37] font-heading mb-6">
          My Purchases
        </h2>

        {/* Table Matching Screenshot 2 */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#EBF3FB] text-[11px] font-bold text-[#0A264D] uppercase tracking-wider font-mono border-b border-slate-200">
                <th className="py-3 px-4">PRODUCT</th>
                <th className="py-3 px-4">AMOUNT</th>
                <th className="py-3 px-4">PAYMENT</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-medium text-sm">
                    No Purchases Found
                  </td>
                </tr>
              ) : (
                purchases.map((p, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 text-xs">
                    <td className="py-3 px-4 font-semibold text-slate-800">{p.product}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.amount}</td>
                    <td className="py-3 px-4">{p.payment}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{p.date}</td>
                    <td className="py-3 px-4 text-center">
                      <button className="text-blue-600 hover:underline font-semibold">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
