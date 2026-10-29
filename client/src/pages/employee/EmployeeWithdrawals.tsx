import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { WithdrawalsView } from '../../components/dashboard/WithdrawalsView';

export const EmployeeWithdrawals: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Withdrawals">
      <WithdrawalsView />
    </EmployeeLayout>
  );
};
