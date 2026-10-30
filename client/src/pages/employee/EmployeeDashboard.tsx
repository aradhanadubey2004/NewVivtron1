import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { EmployeeDashboardData, Task, ChargingStation } from '../../types';
import {
  CheckSquare,
  Clock,
  BatteryCharging,
  AlertCircle,
  CheckCircle2,
  Bell,
  ArrowRight,
  Activity,
  MapPin,
  Wrench,
  Sparkles,
  Copy,
  Check,
  Coins,
  Wallet,
  Trophy,
  Zap,
  GitFork,
  ShieldCheck,
  Search,
  ChevronRight,
  Filter,
  AlertTriangle
} from 'lucide-react';

export const EmployeeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<EmployeeDashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Active sub-tab
  const [activeTab, setActiveTab] = useState<'tasks' | 'stations' | 'earnings' | 'tree' | 'kyc'>('tasks');

  // Copy feedback states
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Search filter
  const [taskFilter, setTaskFilter] = useState<'ALL' | 'Pending' | 'In Progress' | 'Completed'>('ALL');

  const referralCode = user?.employee_id || 'VT000001';
  const referralLink = `https://login.vivtronevcs.com/register?ref=${referralCode}`;
  const employeeName = user?.name || 'NAVODAYA GROWTH PVT.LTD';

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.employee.getDashboard();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err: any) {
      console.error('Employee dashboard error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleUpdateStatus = async (taskId: number, newStatus: Task['status']) => {
    try {
      const res = await api.employee.updateTaskStatus(taskId, newStatus);
      if (res.success) {
        fetchDashboardData();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update task status.');
    }
  };

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

  const tasksList = data?.tasks || [
    { id: 1, title: 'Preventive Connector Maintenance - Metro Central', station_name: 'Metro Central Superhub', station_code: 'VIV-ST-001', location: 'Noida Sector 62', priority: 'High', status: 'Pending', due_date: 'Today, 5:00 PM' },
    { id: 2, title: 'Firmware Update & OCPP 2.0.1 Protocol Handshake', station_name: 'Airport Express Depot', station_code: 'VIV-ST-002', location: 'Delhi NCR Terminal 2', priority: 'Critical', status: 'In Progress', due_date: 'Tomorrow, 11:00 AM' },
    { id: 3, title: 'Thermal Cooling Loop Inspection & Liquid Level Check', station_name: 'Innovation Park Hub', station_code: 'VIV-ST-003', location: 'Gurugram Cybercity', priority: 'Medium', status: 'Pending', due_date: '28 Oct 2026' },
    { id: 4, title: 'Quarterly Metering Accuracy & Sub-meter Calibration', station_name: 'Downtown Commercial Hub', station_code: 'VIV-ST-006', location: 'Connaught Place', priority: 'Low', status: 'Completed', due_date: '25 Oct 2026' },
  ];

  const filteredTasks = tasksList.filter((t) => taskFilter === 'ALL' || t.status === taskFilter);

  return (
    <EmployeeLayout>
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
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-sans">
                DASHBOARD
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A1D37] font-sans leading-tight tracking-tight">
                Welcome, <br />
                <span className="text-[#2EB85C] block mt-0.5">{employeeName}</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium font-sans">
                Welcome back! Have a productive day.
              </p>
            </div>

            {/* Bottom Row inside Welcome Card */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-slate-100 flex items-center justify-between gap-4 relative z-10">
              <div>
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Wallet</span>
                <span className="text-xl sm:text-2xl font-black text-[#0A1D37] font-heading">
                  ₹0.00
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-medium text-slate-400 block mb-0.5">Rank</span>
                <span className="text-sm sm:text-base font-extrabold text-[#2EB85C] bg-[#EAF3E5] px-3 py-1 rounded-full border border-[#2EB85C]/20">
                  Pre Sales Executive
                </span>
              </div>
            </div>
          </div>

          {/* CARD 2 (RIGHT): REFERRAL DETAILS CARD */}
          <div className="lg:col-span-5 rounded-[26px] bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Header with Active Pill */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg sm:text-xl font-bold text-[#0A1D37] font-heading">
                  Referral Details
                </h3>
                <span className="px-3 py-0.5 rounded-full bg-[#EAF3E5] text-[#2EB85C] text-xs font-bold font-mono tracking-wide">
                  Active
                </span>
              </div>

              {/* Referral Code Row */}
              <div className="mb-4">
                <span className="text-xs text-slate-400 block mb-1 font-medium">Referral Code</span>
                <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5">
                  <span className="text-xl sm:text-2xl font-black text-[#0A1D37] font-mono tracking-wider">
                    {referralCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-xl bg-[#081E3E] hover:bg-[#06152B] text-white text-xs font-bold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{codeCopied ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              {/* Referral Link Row */}
              <div className="mb-5">
                <span className="text-xs text-slate-400 block mb-1 font-medium">Referral Link</span>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600 truncate select-all">
                    {referralLink}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-[#2EB85C] hover:bg-[#28A745] text-white text-xs font-bold transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#2EB85C]/30 active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                  >
                    {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{linkCopied ? 'Done' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Stats Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-center">
              <div>
                <span className="text-xs text-slate-500 font-medium block">Direct Referrals</span>
                <span className="text-2xl font-extrabold text-[#2EB85C] font-heading mt-0.5 block">
                  2
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 font-medium block">Team Size</span>
                <span className="text-2xl font-extrabold text-[#0A1D37] font-heading mt-0.5 block">
                  43
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: THE 4 METRIC STATS CARDS MATCHING REFERENCE BOTTOM CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Stat 1: Total Income */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Total Income
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0A1D37] font-heading">
                ₹0.00
              </div>
              <span className="text-[11px] text-[#2EB85C] font-semibold mt-1 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Field incentive active</span>
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
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Wallet Balance
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0A1D37] font-heading">
                ₹0.00
              </div>
              <span className="text-[11px] text-slate-400 font-medium mt-1 block">
                Available for withdrawal
              </span>
            </div>

            {/* 3D Wallet Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-emerald-600/20 border border-emerald-500/20 flex items-center justify-center text-[#2EB85C] shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Wallet className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 3: Current Rank */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Current Rank
              </span>
              <div className="text-lg sm:text-xl font-black text-[#0A1D37] font-heading truncate max-w-[140px]">
                Pre Sales Executive
              </div>
              <span className="text-[11px] text-amber-600 font-semibold mt-1 inline-flex items-center gap-1">
                <span>Tier 1 Elite Network</span>
              </span>
            </div>

            {/* 3D Trophy Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 via-amber-400/15 to-yellow-600/20 border border-yellow-500/20 flex items-center justify-center text-yellow-600 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <Trophy className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>

          {/* Stat 4: Assigned Priority Tasks */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center justify-between group cursor-default">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Assigned Tasks
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0A1D37] font-heading">
                {loading ? '...' : `${data?.stats.pendingTasksCount || 2} Pending`}
              </div>
              <span className="text-[11px] text-[#2EB85C] font-semibold mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2EB85C] animate-pulse"></span>
                <span>Active Dispatch Queue</span>
              </span>
            </div>

            {/* 3D Lightning/Check Style Icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-indigo-600/20 border border-blue-500/20 flex items-center justify-center text-[#1E60D5] shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <CheckSquare className="w-7 h-7 drop-shadow-sm" />
            </div>
          </div>
        </div>

        {/* ROW 3: DETAILED OPERATIONAL WORKSPACE TABS */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Tab Navigation Bar */}
          <div className="border-b border-slate-200 px-6 pt-4 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'tasks'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5 text-[#2EB85C]" />
                <span>My Assigned Tasks ({filteredTasks.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('stations')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'stations'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                <span>Assigned Superhubs</span>
              </button>

              <button
                onClick={() => setActiveTab('earnings')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'earnings'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span>Field Allowances</span>
              </button>

              <button
                onClick={() => setActiveTab('tree')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'tree'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <GitFork className="w-3.5 h-3.5 text-emerald-400" />
                <span>Team Network (43 Members)</span>
              </button>

              <button
                onClick={() => setActiveTab('kyc')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  activeTab === 'kyc'
                    ? 'bg-[#081E3E] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Technician ID & KYC</span>
              </button>
            </div>

            {/* Quick Action */}
            <button
              onClick={() => navigate('/evcs/employee/tasks')}
              className="text-xs font-bold text-[#1E60D5] hover:text-[#144FBA] flex items-center gap-1 transition mb-2 sm:mb-0 cursor-pointer"
            >
              <span>View Full Task Console</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* TAB 1: ASSIGNED TASKS */}
          {activeTab === 'tasks' && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Field Maintenance & Service Tickets
                  </h4>
                  <p className="text-xs text-slate-500">
                    Update inspection milestones and mark tickets as completed upon field sign-off.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  {(['ALL', 'Pending', 'In Progress', 'Completed'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setTaskFilter(filter)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        taskFilter === filter
                          ? 'bg-white text-[#0A1D37] shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tasks Cards Stream */}
              <div className="space-y-3">
                {filteredTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            task.priority === 'Critical'
                              ? 'bg-red-100 text-red-800 border border-red-200'
                              : task.priority === 'High'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}
                        >
                          {task.priority} Priority
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {task.station_code || 'VIV-ST-001'}
                        </span>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.due_date || 'Today, 6:00 PM'}</span>
                        </span>
                      </div>

                      <h5 className="font-bold text-sm text-[#0A1D37]">{task.title}</h5>

                      <p className="text-xs text-slate-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#2EB85C] shrink-0" />
                        <span>{task.station_name} • {task.location}</span>
                      </p>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      {task.status !== 'In Progress' && task.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'In Progress')}
                          className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition cursor-pointer shadow-xs"
                        >
                          Start Diagnostic
                        </button>
                      )}

                      {task.status === 'In Progress' && (
                        <button
                          onClick={() => handleUpdateStatus(task.id, 'Completed')}
                          className="px-3.5 py-2 rounded-xl bg-[#2EB85C] hover:bg-[#28A745] text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Complete & Log</span>
                        </button>
                      )}

                      {task.status === 'Completed' && (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified & Closed</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: STATIONS */}
          {activeTab === 'stations' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    My Assigned Charging Stations
                  </h4>
                  <p className="text-xs text-slate-500">
                    Real-time hardware status of stations in your regional service jurisdiction.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/evcs/employee/stations')}
                  className="px-3 py-2 bg-[#081E3E] text-white rounded-xl text-xs font-bold hover:bg-[#06152B] transition"
                >
                  View All Telemetry
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Metro Central Superhub', code: 'VIV-ST-001', location: 'Noida Sector 62', power: '360 kW', connectors: '4x CCS2', status: 'Online', uptime: '99.9%' },
                  { name: 'Airport Express Depot', code: 'VIV-ST-002', location: 'Terminal 2 Logistics Way', power: '240 kW', connectors: '2x CCS2', status: 'Online', uptime: '99.7%' },
                ].map((st, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-[#2EB85C] bg-[#EAF3E5] px-2 py-0.5 rounded">
                          {st.code}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {st.status} • {st.uptime}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-[#0A1D37]">{st.name}</h5>
                      <p className="text-xs text-slate-500 mt-1">{st.location}</p>
                      <div className="mt-3 flex items-center gap-3 text-xs">
                        <span className="font-bold text-[#2EB85C]">{st.power}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 font-mono">{st.connectors}</span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Next Scheduled Check: Tomorrow</span>
                      <button
                        onClick={() => navigate('/evcs/employee/stations')}
                        className="text-[#1E60D5] font-bold hover:underline"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EARNINGS & ALLOWANCES */}
          {activeTab === 'earnings' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Field Allowances & Task Incentives
                  </h4>
                  <p className="text-xs text-slate-500">
                    Daily travel stipend, preventive maintenance bonuses, and wallet settlements.
                  </p>
                </div>
                <button
                  onClick={() => alert('Withdrawal request submitted.')}
                  className="px-4 py-2 bg-[#2EB85C] text-white rounded-xl text-xs font-bold hover:bg-[#28A745] transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>Withdraw Allowance</span>
                </button>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2">
                <Coins className="w-10 h-10 text-amber-500 mx-auto" />
                <h5 className="font-bold text-slate-800 text-sm">Account Balance: ₹0.00</h5>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Completed ticket allowances are credited automatically at 11:59 PM daily upon verified dispatch logs.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: TREE */}
          {activeTab === 'tree' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    My Team Network Hierarchy
                  </h4>
                  <p className="text-xs text-slate-500">
                    Direct referrers and field technician squad hierarchy.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#2EB85C] bg-[#EAF3E5] px-3 py-1 rounded-full">
                  Team Size: 43
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-[#081E3E] text-white space-y-4">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl border border-white/20">
                  <div className="w-10 h-10 rounded-full bg-[#2EB85C] flex items-center justify-center font-bold text-white shadow-md">
                    VT
                  </div>
                  <div>
                    <div className="font-bold text-sm">{employeeName}</div>
                    <div className="text-xs text-emerald-400 font-mono">ID: {referralCode} • Rank: Pre Sales Executive</div>
                  </div>
                </div>

                <div className="pl-6 border-l-2 border-emerald-500/40 space-y-3 mt-3">
                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-xs text-white">Direct Line: Senior Hardware Tech - Noida Hub</div>
                      <div className="text-[10px] text-slate-400 font-mono">ID: VT000004 • 12 Active Stations</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: KYC */}
          {activeTab === 'kyc' && (
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#0A1D37] font-heading">
                    Technician Clearance & Certified KYC
                  </h4>
                  <p className="text-xs text-slate-500">
                    High-voltage safety certification, government identity, and emergency credentials.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                  Authorized & Certified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#2EB85C]" />
                    <span>Government Aadhaar / ID Verification</span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono">UIDAI Verified • Level 3 Clearance</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-[#2EB85C]" />
                    <span>High Voltage EVCS Safety Certification</span>
                  </div>
                  <p className="text-xs text-slate-600 font-mono">ISO 15118 & IEC 61851 Certified Specialist</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </EmployeeLayout>
  );
};
