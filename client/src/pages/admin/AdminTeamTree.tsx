import React from 'react';
import { AdminLayout } from '../../components/dashboard/AdminLayout';
import { TeamTreeView } from '../../components/dashboard/TeamTreeView';

export const AdminTeamTree: React.FC = () => {
  return (
    <AdminLayout pageTitle="Team Tree">
      <TeamTreeView />
    </AdminLayout>
  );
};
