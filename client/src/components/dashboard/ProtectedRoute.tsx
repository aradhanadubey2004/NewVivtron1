import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-700">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-[#022353]/20 border-t-[#022353] animate-spin"></div>
        </div>
        <p className="mt-4 text-xs font-bold tracking-wider text-slate-500 uppercase">Verifying Security Credentials...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/evcs/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If an employee tries to access an Admin route, redirect them to the employee dashboard
    if (user.role === 'Employee') {
      return <Navigate to="/evcs/employee/dashboard" replace />;
    }

    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white border border-red-200 rounded-3xl p-8 text-center shadow-xl">
          <div className="w-16 h-16 mx-auto bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-heading">Access Restricted</h2>
          <p className="text-sm text-slate-600 mt-2">
            Your role (<span className="text-[#022353] font-bold">{user.role}</span>) does not hold the clearance required for this section.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href={user.role === 'Admin' ? '/evcs/admin/dashboard' : '/evcs/employee/dashboard'}
              className="px-5 py-2.5 bg-[#022353] hover:bg-[#022353]/90 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              Return to Your Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
