import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { IncomeHistoryView } from '../../components/dashboard/IncomeHistoryView';

export const EmployeeIncomeHistory: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Income History">
      <IncomeHistoryView />
    </EmployeeLayout>
  );
};
