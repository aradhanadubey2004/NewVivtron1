import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { ProfileView } from '../../components/dashboard/ProfileView';

export const AdminSettings: React.FC = () => {
  return (
    <AdminLayout pageTitle="Profile">
      <ProfileView />
    </AdminLayout>
  );
};
