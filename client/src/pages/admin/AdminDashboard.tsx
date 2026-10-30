import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { KYCVerificationView } from '../../components/dashboard/KYCVerificationView';
import { BankDetailsView } from '../../components/dashboard/BankDetailsView';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { OverviewData, ChargingStation, User } from '../../types';
import {
  Users,
  BatteryCharging,
  Package,
  Activity,
  Zap,
  TrendingUp,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  Coins,
  Wallet,
  Trophy,
  GitFork,
  Landmark,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
  Search,
  Filter,
  Target,
  Gift,
  BarChart2
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<OverviewData | null>(null);
  const [stations, setStations] = useState<ChargingStation[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'stations' | 'team' | 'finance' | 'tree' | 'kyc'>('stations');

  // Copy feedback states
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  const referralCode = user?.employee_id || 'VT000001';
  const referralLink = `https://login.vivtronevcs.com/register?ref=${referralCode}`;
  const companyName = user?.name || 'NAVODAYA GROWTH PVT.LTD';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [overviewRes, stationsRes, employeesRes] = await Promise.all([
          api.admin.getOverview().catch(() => ({ success: false, data: null })),
          api.admin.getStations().catch(() => ({ success: false, data: [] })),
          api.admin.getEmployees().catch(() => ({ success: false, data: [] })),
        ]);

        if (overviewRes.success && overviewRes.data) {
          setData(overviewRes.data);
        }
        if (stationsRes.success && stationsRes.data) {
          setStations(stationsRes.data);
        }
        if (employeesRes.success && employeesRes.data) {
          setEmployees(employeesRes.data);
        }
      } catch (err) {
        console.error('Failed to load admin overview', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const filteredStations = stations.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.station_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6 sm:space-y-8 max-w-7xl mx-auto font-sans">
        {/* ROW 1: THE TWO HERO CARDS MATCHING REFERENCE SCREENSHOT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* CARD 1 (LEFT): WELCOME HERO BANNER */}
          <div className="lg:col-span-7 rounded-[26px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between border-l-4 border-l-[#2EB85C]">
            {/* Watermark Logo in background */}
            <img
              src="/images/vivtron-ve-logo.png"
              alt="Vivtron Watermark"
              className="absolute -right-4 -bottom-6 w-52 h-auto opacity-[0.06] pointer-events-none select-none"
            />

            <div className="space-y-3 relative z-10">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest font-sans">
                DASHBOARD
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A1D37] font-sans leading-tight tracking-tight">
                Welcome, <br />
                <span className="text-[#2EB85C] block mt-0.5">{companyName}</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-bold font-sans">
                Welcome back! Have a productive day.
              </p>
            </div>

            {/* Bottom Row inside Welcome Card */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-slate-100 flex items-center justify-between gap-4 relative z-10">
              <div>
                <span className="text-[11px] font-bold text-slate-500 block mb-0.5 font-sans">Wallet</span>
                <span className="text-xl sm:text-2xl font-black text-[#0A1D37] font-sans">
                  ₹0.00
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-500 block mb-0.5 font-sans">Rank</span>
                <span className="text-sm sm:text-base font-extrabold text-[#2EB85C] bg-[#EAF3E5] px-3.5 py-1 rounded-full border border-[#2EB85C]/30 font-sans shadow-2xs">
                  Pre Sales Executive
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2 (RIGHT): REFERRAL DETAILS CARD */}
          <div className="lg:col-span-5 rounded-[26px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between font-sans">
            <div>
              {/* Header with Active Pill */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-black text-[#0A1D37] font-sans">
                  Referral Details
                </h3>
                <span className="px-3 py-0.5 rounded-full bg-[#EAF3E5] text-[#2EB85C] text-xs font-black font-sans tracking-wide">
                  Active
                </span>
              </div>

              {/* Referral Code Row */}
              <div className="mb-4">
                <span className="text-xs text-slate-500 block mb-1 font-bold font-sans">Referral Code</span>
                <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                  <span className="text-xl sm:text-2xl font-black text-[#0A1D37] font-sans tracking-wide">
                    {referralCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-xl bg-[#081E3E] hover:bg-[#06152B] hover:shadow-lg hover:shadow-[#081E3E]/30 text-white text-xs font-black transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs font-sans"
                  >
                    {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{codeCopied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Referral Link Row */}
              <div className="mb-5">
                <span className="text-xs text-slate-500 block mb-1 font-bold font-sans">Referral Link</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-sans font-bold text-slate-700 truncate select-all focus-within:border-[#2EB85C]">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-[#2EB85C] hover:bg-[#28A745] hover:shadow-lg hover:shadow-[#2EB85C]/40 text-white text-xs font-black transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 font-sans"
                  >
                    {linkCopied ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{linkCopied ? 'Done' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center font-sans">
              <div>
                <span className="text-xs text-slate-600 font-bold block font-sans">Direct Referrals</span>
                <span className="text-2xl sm:text-3xl font-black text-[#2EB85C] font-sans mt-0.5 block">
                  2
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-600 font-bold block font-sans">Team Size</span>
                <span className="text-2xl sm:text-3xl font-black text-[#0A1D37] font-sans mt-0.5 block">
                  43
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: THE 6 METRIC STATS CARDS MATCHING REFERENCE SCREENSHOT 3 & 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-sans">
          {/* Stat 1: Total Income */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1 font-sans">
                Total Income
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#0A1D37] font-sans tracking-tight">
                ₹0
              </div>
              <span className="text-xs font-bold text-slate-600 mt-1 block font-sans">
                Total Earnings
              </span>
            </div>

            {/* 3D Money Bag Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-amber-600/20 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Coins className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 2: Wallet Balance */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1 font-sans">
                Wallet Balance
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#0A1D37] font-sans tracking-tight">
                ₹0
              </div>
              <span className="text-xs font-extrabold text-[#2EB85C] mt-1 block font-sans">
                Available Balance
              </span>
            </div>

            {/* 3D Wallet / Purse Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-emerald-600/20 border border-emerald-500/20 flex items-center justify-center text-[#2EB85C] shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <Wallet className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 3: Current Rank */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1 font-sans">
                Current Rank
              </span>
              <div className="text-xl sm:text-2xl font-black text-[#0A1D37] font-sans truncate max-w-[170px] tracking-tight">
                Pre Sales Executive
              </div>
              <span className="text-xs font-extrabold text-[#2EB85C] mt-1 block font-sans">
                Active Rank
              </span>
            </div>

            {/* 3D Trophy Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 via-amber-400/15 to-yellow-600/20 border border-yellow-500/20 flex items-center justify-center text-yellow-600 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Trophy className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 4: Operational Sales */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1 font-sans">
                Operational Sales
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#0A1D37] font-sans tracking-tight">
                0
              </div>
              <span className="text-xs font-bold text-slate-600 mt-1 block font-sans">
                Monthly Sales
              </span>
            </div>

            {/* 3D Chart Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-indigo-600/20 border border-blue-500/20 flex items-center justify-center text-[#1E60D5] shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <BarChart2 className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 5: Referral Points */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-1 font-sans">
                Referral Points
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#0A1D37] font-sans tracking-tight">
                0
              </div>
              <span className="text-xs font-bold text-slate-600 mt-1 block font-sans">
                Total Points
              </span>
            </div>

            {/* 3D Target Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400/20 via-rose-500/10 to-purple-600/20 border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-inner group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
              <Target className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 6: Reward Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default font-sans">
            <div>
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-0.5 font-sans">
                Reward
              </span>
              <div className="text-lg sm:text-xl font-black text-amber-600 font-sans tracking-tight">
                No Reward
              </div>
              <div className="text-[11px] text-slate-600 font-bold space-y-0.5 mt-1 font-sans">
                <div>Self Sales: <strong className="text-slate-900 font-black">2</strong></div>
                <div>Team Business: <strong className="text-slate-900 font-black">41</strong></div>
                <div>Total Business: <strong className="text-slate-900 font-black">43</strong></div>
              </div>
              <span className="text-xs font-black text-amber-600 mt-1.5 block font-sans">
                Rank Achievement
              </span>
            </div>

            {/* 3D Gift Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-amber-600/20 border border-amber-500/20 flex items-center justify-center text-amber-500 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 self-start">
              <Gift className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* ROW 3: RECENT JOINING MEMBERS TABLE MATCHING REFERENCE SCREENSHOT 1 & 2 */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm overflow-hidden font-sans">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-white border-b border-slate-200/80 text-slate-500 font-extrabold uppercase tracking-wider text-xs font-sans">
                <tr>
                  <th className="py-4 px-6 sm:px-8">NAME</th>
                  <th className="py-4 px-6 sm:px-8">REFERRAL CODE</th>
                  <th className="py-4 px-6 sm:px-8">JOINING DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold font-sans">
                {[
                  { name: 'Garima', code: 'VT000008', date: '2026-08-13 05:02:24' },
                  { name: 'Priya kesarwani', code: 'VT000002', date: '2026-08-09 08:18:33' },
                  { name: 'Arun Sharma', code: 'VT000015', date: '2026-08-05 11:20:10' },
                  { name: 'Neha Verma', code: 'VT000021', date: '2026-07-28 16:45:00' },
                ].map((member, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6 sm:px-8 font-extrabold text-[#0A1D37] text-sm font-sans">
                      {member.name}
                    </td>
                    <td className="py-4 px-6 sm:px-8 font-black text-[#2EB85C] text-sm font-sans tracking-wide">
                      {member.code}
                    </td>
                    <td className="py-4 px-6 sm:px-8 text-slate-700 text-xs font-bold font-sans tracking-normal">
                      {member.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ROW 4: RECENT INCOME CARD MATCHING REFERENCE SCREENSHOT 1 & 2 */}
        <div className="rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden bg-white font-sans">
          {/* Blue to Green Gradient Banner Header */}
          <div className="bg-gradient-to-r from-[#082B59] via-[#0E4C7A] to-[#2EB85C] px-6 sm:px-8 py-4.5 flex items-center justify-between text-white">
            <h3 className="text-base sm:text-lg font-black font-sans text-white tracking-wide">
              Recent Income
            </h3>
          </div>

          {/* Inner Table Card */}
          <div className="p-4 sm:p-6 bg-slate-50/30 font-sans">
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
              <div className="grid grid-cols-3 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider font-sans">
                <div>AMOUNT</div>
                <div className="text-center">TYPE</div>
                <div className="text-right">DATE</div>
              </div>
              <div className="py-10 text-center text-sm font-black text-[#0A1D37] font-sans">
                No Income Found
              </div>
            </div>
          </div>
        </div>

        {/* ROW 5: RECENT WITHDRAWALS CARD MATCHING REFERENCE SCREENSHOT 1 & 2 */}
        <div className="rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden bg-white font-sans">
          {/* Blue to Green Gradient Banner Header */}
          <div className="bg-gradient-to-r from-[#082B59] via-[#0E4C7A] to-[#2EB85C] px-6 sm:px-8 py-4.5 flex items-center justify-between text-white">
            <h3 className="text-base sm:text-lg font-black font-sans text-white tracking-wide">
              Recent Withdrawals
            </h3>
          </div>

          {/* Inner Table Card */}
          <div className="p-4 sm:p-6 bg-slate-50/30 font-sans">
            <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs">
              <div className="grid grid-cols-3 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider font-sans">
                <div>AMOUNT</div>
                <div className="text-center">STATUS</div>
                <div className="text-right">DATE</div>
              </div>
              <div className="py-10 text-center text-sm font-black text-[#0A1D37] font-sans">
                No Withdrawals Found
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: DETAILED OPERATIONAL WORKSPACE TABS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Tab Navigation Bar */}
          <div className="border-b border-slate-200 px-6 pt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveTab('stations')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${activeTab === 'stations'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#2EB85C]" />
                <span>Charging Stations ({stations.length || 7})</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${activeTab === 'team'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
              >
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>My Team & Staff ({employees.length || 5})</span>
              </button>

              <button
                onClick={() => setActiveTab('finance')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${activeTab === 'finance'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
              >
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Income & Payouts</span>
              </button>

              <button
                onClick={() => setActiveTab('tree')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${activeTab === 'tree'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
              >
                <GitFork className="w-3.5 h-3.5 text-emerald-400" />
                <span>Team Tree (43 Members)</span>
              </button>

              <button
                onClick={() => setActiveTab('kyc')}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${activeTab === 'kyc'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                  }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>KYC Verification Desk</span>
              </button>
            </div>

            {/* Right Action */}
            <button
              onClick={() => navigate('/evcs/admin/stations')}
              className="text-xs font-black text-[#1E60D5] hover:text-[#144FBA] flex items-center gap-1 transition mb-2 sm:mb-0 cursor-pointer"
            >
              <span>Manage All In Fullscreen</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: CHARGING STATIONS TELEMETRY */}
          {activeTab === 'stations' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Live Operational Superhubs
                  </h4>
                  <p className="text-xs text-slate-500">
                    Real-time telemetry and kilowatt dispensing across active nodes.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search hub or city..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2EB85C]"
                    />
                  </div>
                  <button
                    onClick={() => navigate('/evcs/admin/stations')}
                    className="px-3 py-2 bg-[#081E3E] text-white rounded-xl text-xs font-bold hover:bg-[#06152B] transition flex items-center gap-1.5 shrink-0"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Station</span>
                  </button>
                </div>
              </div>

              {/* Station Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Station ID & Name</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Power Rating</th>
                      <th className="py-3 px-4">Connectors</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(filteredStations.length > 0 ? filteredStations : [
                      { id: 1, station_code: 'VIV-ST-001', name: 'Metro Central Superhub', location: '450 Silicon Boulevard', city: 'Noida', power_output: '360 kW', connectors: '4x CCS2, 2x CHAdeMO', status: 'Online' },
                      { id: 2, station_code: 'VIV-ST-002', name: 'Airport Express Depot', location: 'Terminal 2 Logistics Way', city: 'Delhi NCR', power_output: '240 kW', connectors: '2x CCS2, 1x CHAdeMO', status: 'Online' },
                      { id: 3, station_code: 'VIV-ST-003', name: 'Innovation Park Hub', location: '88 Research Parkway', city: 'Gurugram', power_output: '150 kW', connectors: '2x CCS2', status: 'In Use' },
                      { id: 4, station_code: 'VIV-ST-004', name: 'Commercial Fleet Plaza', location: 'Sector 63 Freight Way', city: 'Noida', power_output: '180 kW', connectors: '4x CCS2', status: 'Online' },
                    ]).map((station: any) => (
                      <tr key={station.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#0A1D37]">{station.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{station.station_code}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {station.location}, {station.city}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-[#2EB85C] font-mono bg-[#EAF3E5] px-2 py-0.5 rounded">
                            {station.power_output}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                          {station.connectors}
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase inline-flex items-center gap-1 ${station.status === 'Online'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : station.status === 'In Use'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {station.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => navigate('/evcs/admin/stations')}
                            className="text-[#1E60D5] hover:text-[#144FBA] font-bold cursor-pointer"
                          >
                            View Telemetry
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: FIELD TEAM & WORKFORCE */}
          {activeTab === 'team' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Active Workforce & Dispatch Specialists
                  </h4>
                  <p className="text-xs text-slate-500">
                    Staff roster, regional assignment zones, and credential statuses.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/evcs/admin/employees')}
                  className="px-3 py-2 bg-[#081E3E] text-white rounded-xl text-xs font-bold hover:bg-[#06152B] transition flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Onboard Staff</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(employees.length > 0 ? employees : [
                  { id: 1, name: 'Elena Rostova', employee_id: 'VIV-EMP-101', designation: 'Senior EVCS Field Specialist', department: 'Operations & Maintenance', status: 'Active' },
                  { id: 2, name: 'Sarah Jenkins', employee_id: 'VIV-EMP-102', designation: 'Charging Hardware Technician', department: 'Field Engineering', status: 'Active' },
                  { id: 3, name: 'Dev Patel', employee_id: 'VIV-EMP-103', designation: 'Grid Integration Engineer', department: 'Power Systems', status: 'Active' },
                ]).map((emp: any) => (
                  <div key={emp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#2EB85C] bg-[#EAF3E5] px-2 py-0.5 rounded">
                          {emp.employee_id}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {emp.status}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-[#0A1D37]">{emp.name}</h5>
                      <p className="text-xs text-slate-600 mt-0.5">{emp.designation}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{emp.department}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Assigned: 3 Tasks</span>
                      <button
                        onClick={() => navigate('/evcs/admin/employees')}
                        className="text-[#1E60D5] font-bold hover:underline"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FINANCE & PAYOUTS */}
          {activeTab === 'finance' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Income History & Settlement Ledger
                  </h4>
                  <p className="text-xs text-slate-500">
                    Direct commission rewards, member overrides, and withdrawal disbursements.
                  </p>
                </div>
                <button
                  onClick={() => alert('Withdrawal request initialized.')}
                  className="px-4 py-2 bg-[#2EB85C] text-white rounded-xl text-xs font-bold hover:bg-[#28A745] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Request Settlement</span>
                </button>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                <Coins className="w-10 h-10 text-amber-500 mx-auto" />
                <h5 className="font-bold text-slate-800 text-sm">Account Balance: ₹0.00</h5>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  No pending withdrawals currently awaiting clearance. Payouts are reconciled every Monday and Friday at 6:00 PM IST.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TEAM TREE */}
          {activeTab === 'tree' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Organization Network Tree Hierarchy
                  </h4>
                  <p className="text-xs text-slate-500">
                    Downline network visualization starting from root sponsor {referralCode}.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#2EB85C] bg-[#EAF3E5] px-3 py-1 rounded-full">
                  Level 3 Depth Active
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#081E3E] text-white space-y-4">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-[#2EB85C] flex items-center justify-center font-bold text-white shadow-md">
                    VT
                  </div>
                  <div>
                    <div className="font-bold text-sm">{companyName}</div>
                    <div className="text-xs text-emerald-400 font-mono">Code: {referralCode} • Rank: Pre Sales Executive</div>
                  </div>
                </div>

                <div className="pl-6 border-l-2 border-emerald-500/40 space-y-3 mt-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-white">Direct Line 1: Northern Hub Dealership (Delhi NCR)</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: VT000002 • 28 Active Stations</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-white">Direct Line 2: Western Corridor Mobility (UP West)</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: VT000003 • 15 Active Stations</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KYC DESK */}
          {activeTab === 'kyc' && (
            <div className="p-4 sm:p-6">
              <KYCVerificationView />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
