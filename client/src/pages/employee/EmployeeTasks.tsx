import React, { useEffect, useState } from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { api } from '../../services/api';
import { Task } from '../../types';
import {
  MapPin,
  Check,
} from 'lucide-react';

export const EmployeeTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('All');
  const [resolutionNotes, setResolutionNotes] = useState<{ [id: number]: string }>({});

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.employee.getTasks();
      if (res.success && res.data) {
        setTasks(res.data);
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdate = async (id: number, status: Task['status']) => {
    const note = resolutionNotes[id];
    try {
      const res = await api.employee.updateTaskStatus(id, status, note);
      if (res.success) {
        fetchTasks();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update task.');
    }
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'All') return true;
    return t.status === filter;
  });

  return (
    <EmployeeLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#022353] font-heading">
              My Assigned Tasks & Maintenance Orders
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Field inspection tickets, firmware deployments, and dispenser calibration orders.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-800 focus:border-[#022353] outline-none shadow-xs"
            >
              <option value="All">All Tasks ({tasks.length})</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task Cards List */}
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500 font-medium">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center text-xs text-slate-500 shadow-xs">
            No tasks found matching current filter.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-[#022353]/30 transition space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        t.priority === 'Critical' ? 'bg-red-50 text-red-700 border border-red-200' :
                        t.priority === 'High' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {t.priority} Priority
                      </span>
                      <span className="text-xs font-mono text-slate-500">Due: {t.due_date || 'Standard'}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-heading">{t.title}</h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{t.description}</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                    t.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    t.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {t.status}
                  </span>
                </div>

                {t.station_name && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#022353]" />
                      <span>{t.station_name} — {t.location}, {t.city}</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold text-[#022353]">{t.station_code}</span>
                  </div>
                )}

                {/* Status Update Controls */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Add resolution or inspection notes..."
                      value={resolutionNotes[t.id] || ''}
                      onChange={(e) => setResolutionNotes({ ...resolutionNotes, [t.id]: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#022353]"
                    />
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    {t.status !== 'In Progress' && t.status !== 'Completed' && (
                      <button
                        onClick={() => handleUpdate(t.id, 'In Progress')}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition"
                      >
                        Start Working
                      </button>
                    )}
                    {t.status !== 'Completed' && (
                      <button
                        onClick={() => handleUpdate(t.id, 'Completed')}
                        className="px-3.5 py-1.5 rounded-lg bg-[#022353] hover:bg-[#022353]/90 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark as Completed</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </EmployeeLayout>
  );
};
