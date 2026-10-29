import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { WithdrawalsView } from '../../components/dashboard/WithdrawalsView';

export const AdminWithdrawals: React.FC = () => {
  return (
    <AdminLayout pageTitle="Withdrawals">
      <WithdrawalsView />
    </AdminLayout>
  );
};
