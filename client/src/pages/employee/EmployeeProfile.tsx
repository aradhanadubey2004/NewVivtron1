import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { ProfileView } from '../../components/dashboard/ProfileView';

export const EmployeeProfile: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Profile">
      <ProfileView />
    </EmployeeLayout>
  );
};
