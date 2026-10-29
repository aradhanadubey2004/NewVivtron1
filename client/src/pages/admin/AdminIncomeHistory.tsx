import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { IncomeHistoryView } from '../../components/dashboard/IncomeHistoryView';

export const AdminIncomeHistory: React.FC = () => {
  return (
    <AdminLayout pageTitle="Income History">
      <IncomeHistoryView />
    </AdminLayout>
  );
};
