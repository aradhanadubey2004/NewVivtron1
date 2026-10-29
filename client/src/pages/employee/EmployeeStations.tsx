import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { RechargeStationsView } from '../../components/dashboard/RechargeStationsView';

export const EmployeeStations: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Recharge Stations">
      <RechargeStationsView />
    </EmployeeLayout>
  );
};
