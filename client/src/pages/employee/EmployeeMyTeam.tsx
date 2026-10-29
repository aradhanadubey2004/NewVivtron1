import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { MyTeamView } from '../../components/dashboard/MyTeamView';

export const EmployeeMyTeam: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="My Team">
      <MyTeamView />
    </EmployeeLayout>
  );
};
