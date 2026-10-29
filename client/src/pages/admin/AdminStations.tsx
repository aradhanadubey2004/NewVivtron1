import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { RechargeStationsView } from '../../components/dashboard/RechargeStationsView';

export const AdminStations: React.FC = () => {
  return (
    <AdminLayout pageTitle="Recharge Stations">
      <RechargeStationsView />
    </AdminLayout>
  );
};
