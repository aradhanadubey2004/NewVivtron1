import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { MyTeamView } from '../../components/dashboard/MyTeamView';

export const AdminMyTeam: React.FC = () => {
  return (
    <AdminLayout pageTitle="My Team">
      <MyTeamView />
    </AdminLayout>
  );
};
