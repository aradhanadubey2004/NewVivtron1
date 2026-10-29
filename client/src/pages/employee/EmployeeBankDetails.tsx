import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { BankDetailsView } from '../../components/dashboard/BankDetailsView';

export const EmployeeBankDetails: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Bank Details">
      <div className="space-y-6">
        <BankDetailsView />
      </div>
    </EmployeeLayout>
  );
};
