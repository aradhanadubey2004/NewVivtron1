import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { BankDetailsView } from '../../components/dashboard/BankDetailsView';

export const AdminBankDetails: React.FC = () => {
  return (
    <AdminLayout pageTitle="Bank Details">
      <div className="space-y-6">
        <BankDetailsView />
      </div>
    </AdminLayout>
  );
};
