import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { MyPurchasesView } from '../../components/dashboard/MyPurchasesView';

export const AdminMyPurchases: React.FC = () => {
  return (
    <AdminLayout pageTitle="My Purchases">
      <MyPurchasesView isAdmin={true} />
    </AdminLayout>
  );
};
