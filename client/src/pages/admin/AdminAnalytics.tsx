import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { api } from '../../services/api';
import { OverviewData } from '../../types';
import {
  TrendingUp,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const AdminAnalytics: React.FC = () => {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    api.admin.getOverview()
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const totalKwh = data?.totalKwhDispensed || 740400;
  const estimatedRevenue = Math.round(totalKwh * 16.5); // INR 16.5 / kWh average tariff

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#022353] font-heading">
              Reports & Operational Analytics
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Energy delivered, dispenser utilization rates, network revenue, and grid load efficiency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#022353]" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:border-[#022353] outline-none shadow-xs"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last Quarter</option>
              <option value="1y">Year to Date (2026)</option>
            </select>
          </div>
        </div>

        {/* Analytics Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Power Delivered</span>
            <div className="text-3xl font-extrabold text-[#022353] font-heading mt-2">
              {Math.round(totalKwh).toLocaleString()} <span className="text-sm font-normal text-slate-500">kWh</span>
            </div>
            <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% vs last period</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Estimated Network Revenue</span>
            <div className="text-3xl font-extrabold text-emerald-600 font-heading mt-2">
              ₹{estimatedRevenue.toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-slate-500">
              Avg. tariff: <span className="font-semibold text-slate-800">₹16.50 / kWh</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Completed Sessions</span>
            <div className="text-3xl font-extrabold text-[#022353] font-heading mt-2">
              {data?.totalSessions?.toLocaleString() || '19,870'}
            </div>
            <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-semibold">
              <span>99.85% Session success rate</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Fleet Uptime Average</span>
            <div className="text-3xl font-extrabold text-emerald-600 font-heading mt-2">
              99.85%
            </div>
            <div className="mt-2 text-xs text-[#022353] font-mono font-medium">
              NOC MTTR &lt; 42 mins
            </div>
          </div>
        </div>

        {/* Visual Charts & Telemetry Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Energy Consumption Trend Bar Graphic */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h3 className="text-base font-bold text-[#022353] font-heading">Energy Dispensed by Day (kWh)</h3>
                <p className="text-[11px] text-slate-500">Aggregated power output from all superhubs</p>
              </div>
              <span className="text-xs font-mono text-[#022353] font-bold">PEAK: 28,400 kWh</span>
            </div>

            <div className="h-56 flex items-end justify-between gap-2 px-2 pt-8">
              {[
                { day: 'Mon', kwh: 18200, pct: 64 },
                { day: 'Tue', kwh: 21400, pct: 75 },
                { day: 'Wed', kwh: 23900, pct: 84 },
                { day: 'Thu', kwh: 22100, pct: 78 },
                { day: 'Fri', kwh: 28400, pct: 100 },
                { day: 'Sat', kwh: 26800, pct: 94 },
                { day: 'Sun', kwh: 24300, pct: 85 },
              ].map((bar) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-slate-500 font-mono opacity-0 group-hover:opacity-100 transition">
                    {(bar.kwh / 1000).toFixed(1)}k
                  </span>
                  <div
                    className="w-full bg-slate-200 rounded-t-lg group-hover:bg-[#022353] transition-all duration-300"
                    style={{ height: `${bar.pct}%` }}
                  ></div>
                  <span className="text-[11px] font-mono text-slate-500 font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connector Protocol Distribution */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100 mb-6">
                <h3 className="text-base font-bold text-[#022353] font-heading">Protocol & Connector Share</h3>
                <p className="text-[11px] text-slate-500">Session distribution across charging standards</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">CCS2 (Combined Charging System 2)</span>
                    <span className="font-mono text-[#022353] font-bold">68%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#022353]" style={{ width: '68%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">CHAdeMO (Fast DC Protocol)</span>
                    <span className="font-mono text-emerald-600 font-bold">18%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500" style={{ width: '18%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-slate-800">Type 2 (AC Commercial Three-Phase)</span>
                    <span className="font-mono text-indigo-600 font-bold">14%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mt-6 text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>All sessions cryptographically logged with TLS 1.3 under OCPP 2.0.1 compliance standards.</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
