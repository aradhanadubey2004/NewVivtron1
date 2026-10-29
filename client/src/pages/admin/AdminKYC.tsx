import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { KYCVerificationView } from '../../components/dashboard/KYCVerificationView';

export const AdminKYC: React.FC = () => {
  return (
    <AdminLayout pageTitle="KYC Verification">
      <div className="space-y-6">
        <KYCVerificationView />
      </div>
    </AdminLayout>
  );
};
