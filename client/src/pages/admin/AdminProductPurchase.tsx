import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { ProductPurchaseView } from '../../components/dashboard/ProductPurchaseView';

export const AdminProductPurchase: React.FC = () => {
  return (
    <AdminLayout pageTitle="Product Purchase">
      <ProductPurchaseView />
    </AdminLayout>
  );
};
