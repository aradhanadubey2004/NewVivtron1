import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { KYCVerificationView } from '../../components/dashboard/KYCVerificationView';

export const EmployeeKYC: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="KYC Verification">
      <div className="space-y-6">
        <KYCVerificationView />
      </div>
    </EmployeeLayout>
  );
};
