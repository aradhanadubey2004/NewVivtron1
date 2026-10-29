import React, { useState } from 'react';
import { Coins, TrendingUp, Calendar, Filter } from 'lucide-react';

export const IncomeHistoryView: React.FC = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A1D37] font-heading mb-6">
          My Income History
        </h2>

        <div className="py-4 text-slate-600 font-medium text-sm">
          No Income Found.
        </div>
      </div>
    </div>
  );
};
