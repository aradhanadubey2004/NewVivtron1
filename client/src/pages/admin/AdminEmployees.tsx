import React, { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { api } from '../../services/api';
import { User, Role } from '../../types';
import {
  Users,
  UserPlus,
  Edit,
  Power,
  Shield,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  Lock,
  Mail,
  Phone,
  Briefcase,
  Copy,
  Check,
  KeyRound,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles
} from 'lucide-react';

export const AdminEmployees: React.FC = () => {
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editEmployee, setEditEmployee] = useState<User | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employee_id: '',
    password: '',
    role: 'Employee' as Role,
    designation: '',
    department: '',
    phone: '',
  });

  const [formError, setFormError] = useState<string>('');
  const [formSuccess, setFormSuccess] = useState<string>('');
  const [actionLoading, setActionLoading] = useState<boolean>(false);

  // Post-registration credentials handover state
  const [createdCredentials, setCreatedCredentials] = useState<{
    name: string;
    email: string;
    employee_id: string;
    password: string;
    role: string;
  } | null>(null);
  const [showCreatedPassword, setShowCreatedPassword] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedCredentials, setCopiedCredentials] = useState<boolean>(false);

  // Reset password modal state
  const [resetModalEmployee, setResetModalEmployee] = useState<User | null>(null);
  const [resetPasswordValue, setResetPasswordValue] = useState<string>('');
  const [resetSuccess, setResetSuccess] = useState<string>('');
  const [resetError, setResetError] = useState<string>('');
  const [resetLoading, setResetLoading] = useState<boolean>(false);
  const [resetCopied, setResetCopied] = useState<boolean>(false);

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let pwd = 'Viv@';
    for (let i = 0; i < 6; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await api.admin.getEmployees();
      if (res.success && res.data) {
        setEmployees(res.data);
      }
    } catch (err: any) {
      console.error('Fetch employees error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      employee_id: '',
      password: generateRandomPassword(),
      role: 'Employee',
      designation: 'Field Service Specialist',
      department: 'Technical Operations',
      phone: '',
    });
    setFormError('');
    setFormSuccess('');
    setCreatedCredentials(null);
    setCopiedCredentials(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (emp: User) => {
    setEditEmployee(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      employee_id: emp.employee_id,
      password: '',
      role: emp.role,
      designation: emp.designation || '',
      department: emp.department || '',
      phone: emp.phone || '',
    });
    setFormError('');
    setFormSuccess('');
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError('');
    setFormSuccess('');

    try {
      const res = await api.admin.createEmployee({
        name: formData.name,
        email: formData.email,
        employee_id: formData.employee_id.trim() || undefined,
        password: formData.password,
        role: formData.role,
        designation: formData.designation,
        department: formData.department,
        phone: formData.phone,
      });

      if (res.success) {
        const assignedId = res.user?.employee_id || formData.employee_id.trim() || 'VIV-EMP-PROV';
        setCreatedCredentials({
          name: formData.name,
          email: formData.email,
          employee_id: assignedId,
          password: formData.password,
          role: formData.role,
        });
        fetchEmployees();
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to register employee account.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEmployee) return;

    setActionLoading(true);
    setFormError('');
    setFormSuccess('');

    try {
      const res = await api.admin.updateEmployee(editEmployee.id, {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        designation: formData.designation,
        department: formData.department,
        phone: formData.phone,
        password: formData.password || undefined,
      });

      if (res.success) {
        setFormSuccess(res.message);
        setTimeout(() => {
          setEditEmployee(null);
          fetchEmployees();
        }, 1200);
      }
    } catch (err: any) {
      setFormError(err.message || 'Failed to update employee details.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetModalEmployee || !resetPasswordValue) return;

    setResetLoading(true);
    setResetError('');
    setResetSuccess('');

    try {
      const res = await api.admin.resetEmployeePassword(resetModalEmployee.id, resetPasswordValue);
      if (res.success) {
        setResetSuccess(res.message);
      }
    } catch (err: any) {
      setResetError(err.message || 'Failed to reset employee password.');
    } finally {
      setResetLoading(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const res = await api.admin.toggleEmployeeStatus(id);
      if (res.success) {
        fetchEmployees();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to toggle employee status.');
    }
  };

  const copyToClipboard = (text: string, isCredentialsAll = false) => {
    navigator.clipboard.writeText(text);
    if (isCredentialsAll) {
      setCopiedCredentials(true);
      setTimeout(() => setCopiedCredentials(false), 2500);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(search.toLowerCase()) ||
      (emp.designation && emp.designation.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ? true : emp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Employee Management & Provisioning
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Admin registers staff & field technicians, issues Employee IDs, assigns login credentials, and manages passwords.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2.5 rounded-xl bg-[#022353] hover:bg-[#01183b] text-white font-bold text-xs tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-[#022353]/20 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register New Employee</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, email, role..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 focus:border-[#022353] text-xs text-slate-900 placeholder-slate-400 outline-none transition"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-800 focus:border-[#022353] outline-none font-semibold"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Employees Table */}
        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono text-[11px] uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3.5 px-4">Employee ID</th>
                  <th className="py-3.5 px-4">Name & Email</th>
                  <th className="py-3.5 px-4">Role & Access</th>
                  <th className="py-3.5 px-4">Department / Title</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      Loading employee records...
                    </td>
                  </tr>
                ) : filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No matching employee records found.
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-[#022353]">
                          <span>{emp.employee_id}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(emp.employee_id);
                              setCopiedId(emp.employee_id);
                              setTimeout(() => setCopiedId(null), 1800);
                            }}
                            title="Copy Employee ID"
                            className="p-1 text-slate-400 hover:text-[#022353] rounded transition cursor-pointer"
                          >
                            {copiedId === emp.employee_id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <span>{emp.email}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${emp.role === 'Admin'
                            ? 'bg-blue-50 text-[#022353] border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          }`}>
                          {emp.role}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-slate-800 font-semibold">{emp.designation || 'Staff'}</div>
                        <div className="text-[10px] text-slate-500">{emp.department || 'Operations'}</div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600">
                        {emp.phone || 'N/A'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${emp.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                          }`}>
                          {emp.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Password Reset */}
                          <button
                            onClick={() => {
                              setResetModalEmployee(emp);
                              setResetPasswordValue(generateRandomPassword());
                              setResetSuccess('');
                              setResetError('');
                              setResetCopied(false);
                            }}
                            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition border border-indigo-200 cursor-pointer"
                            title="Reset Employee Password"
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit Details */}
                          <button
                            onClick={() => handleOpenEditModal(emp)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition border border-slate-200 cursor-pointer"
                            title="Edit Employee & Roles"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Status Toggle */}
                          <button
                            onClick={() => handleToggleStatus(emp.id)}
                            className={`p-1.5 rounded-lg transition border cursor-pointer ${emp.status === 'Active'
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200'
                              }`}
                            title={emp.status === 'Active' ? 'Deactivate Account' : 'Activate Account'}
                          >
                            <Power className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Employee Modal & Credential Handover */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setCreatedCredentials(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {createdCredentials ? (
              /* Success Credential Handover Screen */
              <div className="space-y-5 animate-fadeIn">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Employee Account Registered!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Employee has been created in the database. Provide the following login credentials to the employee to sign in at <span className="font-semibold text-[#022353]">/evcs/login</span>.
                  </p>
                </div>

                {/* Credential Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500 font-sans font-medium">Employee Name:</span>
                    <span className="font-bold text-slate-900 font-sans">{createdCredentials.name}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500 font-sans font-medium">Employee ID (Login ID):</span>
                    <span className="font-bold text-[#022353]">{createdCredentials.employee_id}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500 font-sans font-medium">Login Email:</span>
                    <span className="font-bold text-slate-900">{createdCredentials.email}</span>
                  </div>

                  <div className="flex items-center justify-between py-1 border-b border-slate-200/80">
                    <span className="text-slate-500 font-sans font-medium">Assigned Password:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {showCreatedPassword ? createdCredentials.password : '••••••••'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowCreatedPassword(!showCreatedPassword)}
                        className="text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showCreatedPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-500 font-sans font-medium">Assigned Role:</span>
                    <span className="font-bold text-slate-900 font-sans">{createdCredentials.role}</span>
                  </div>
                </div>

                {/* Copy All Button */}
                <button
                  type="button"
                  onClick={() => {
                    const text = `Vivtron Staff Login Credentials:\nName: ${createdCredentials.name}\nEmployee ID: ${createdCredentials.employee_id}\nEmail: ${createdCredentials.email}\nPassword: ${createdCredentials.password}\nLogin Portal: ${window.location.origin}/evcs/login`;
                    copyToClipboard(text, true);
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider transition flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  {copiedCredentials ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Credentials Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Credentials for Employee</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCreatedCredentials(null);
                      handleOpenAddModal();
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Register Another Employee
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setCreatedCredentials(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#022353] hover:bg-[#01183b] text-white text-xs font-bold cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <>
                <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2 mb-1">
                  <UserPlus className="w-5 h-5 text-[#022353]" />
                  <span>Register Employee Account</span>
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Admin registers staff personnel and assigns login credentials. The employee will log in using their Employee ID or Email and the password set below.
                </p>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rohan Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Login Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rohan@vivtron.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">
                        Employee ID <span className="font-normal text-slate-400 lowercase">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.employee_id}
                        onChange={(e) => setFormData({ ...formData, employee_id: e.target.value })}
                        placeholder="Auto (e.g. VIV-EMP-105)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 font-mono focus:border-[#022353] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Role Permission *</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none font-semibold"
                      >
                        <option value="Employee">Employee (Field & Telemetry Portal)</option>
                        <option value="Admin">Admin (Full Infrastructure Control)</option>
                      </select>
                    </div>
                  </div>

                  {/* Password with generator */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">Employee Password *</label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, password: generateRandomPassword() })}
                        className="text-[11px] text-[#022353] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#35C759]" />
                        <span>Generate Strong Password</span>
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Min 6 characters"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 font-mono focus:border-[#022353] outline-none pr-10"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Job Designation</label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="Field Technician"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="Technical Operations"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                    />
                  </div>

                  <div className="pt-3 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-5 py-2 rounded-xl bg-[#022353] hover:bg-[#01183b] text-white text-xs font-bold transition disabled:opacity-50 shadow-md shadow-[#022353]/20 cursor-pointer"
                    >
                      {actionLoading ? 'Registering...' : 'Register Employee & Generate Credentials'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quick Reset Password Modal */}
      {resetModalEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => {
                setResetModalEmployee(null);
                setResetSuccess('');
                setResetError('');
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6 text-indigo-700" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Reset Employee Password
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Set a new login password for <span className="font-bold text-slate-800">{resetModalEmployee.name}</span> ({resetModalEmployee.employee_id}).
            </p>

            {resetError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                  <span>{resetSuccess}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Login ID:</span>
                    <span className="font-bold text-[#022353]">{resetModalEmployee.employee_id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Email:</span>
                    <span className="font-bold text-slate-900">{resetModalEmployee.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">New Password:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {resetPasswordValue}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const text = `Vivtron Password Reset:\nName: ${resetModalEmployee.name}\nEmployee ID: ${resetModalEmployee.employee_id}\nEmail: ${resetModalEmployee.email}\nNew Password: ${resetPasswordValue}\nPortal: ${window.location.origin}/evcs/login`;
                    navigator.clipboard.writeText(text);
                    setResetCopied(true);
                    setTimeout(() => setResetCopied(false), 2000);
                  }}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {resetCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{resetCopied ? 'Credentials Copied!' : 'Copy New Credentials'}</span>
                </button>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setResetModalEmployee(null);
                      setResetSuccess('');
                    }}
                    className="px-5 py-2 rounded-xl bg-[#022353] hover:bg-[#01183b] text-white text-xs font-bold cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase">New Password *</label>
                    <button
                      type="button"
                      onClick={() => setResetPasswordValue(generateRandomPassword())}
                      className="text-[11px] text-[#022353] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3 text-[#35C759]" />
                      <span>Generate</span>
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={resetPasswordValue}
                    onChange={(e) => setResetPasswordValue(e.target.value)}
                    placeholder="Enter or generate new password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 font-mono focus:border-[#022353] outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setResetModalEmployee(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="px-5 py-2 rounded-xl bg-[#022353] hover:bg-[#01183b] text-white text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                  >
                    {resetLoading ? 'Updating...' : 'Set New Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {editEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setEditEmployee(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 font-heading flex items-center gap-2 mb-1">
              <Edit className="w-5 h-5 text-[#022353]" />
              <span>Edit Staff: {editEmployee.name}</span>
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Employee ID: <span className="font-mono text-[#022353] font-bold">{editEmployee.employee_id}</span>
            </p>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{formSuccess}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Reset Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Leave blank to keep current"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Role & Permission</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as Role })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none font-semibold"
                  >
                    <option value="Employee">Employee</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:border-[#022353] outline-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditEmployee(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-[#022353] hover:bg-[#01183b] text-white text-xs font-bold transition disabled:opacity-50 shadow-md shadow-[#022353]/20 cursor-pointer"
                >
                  {actionLoading ? 'Saving...' : 'Update Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
