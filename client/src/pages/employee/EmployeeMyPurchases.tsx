import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { MyPurchasesView } from '../../components/dashboard/MyPurchasesView';

export const EmployeeMyPurchases: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="My Purchases">
      <MyPurchasesView isAdmin={false} />
    </EmployeeLayout>
  );
};
