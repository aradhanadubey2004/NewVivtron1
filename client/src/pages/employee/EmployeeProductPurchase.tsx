import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { ProductPurchaseView } from '../../components/dashboard/ProductPurchaseView';

export const EmployeeProductPurchase: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Product Purchase">
      <ProductPurchaseView />
    </EmployeeLayout>
  );
};
