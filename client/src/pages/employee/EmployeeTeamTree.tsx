import React from 'react';
import { EmployeeLayout } from '../../components/dashboard/EmployeeLayout';
import { TeamTreeView } from '../../components/dashboard/TeamTreeView';

export const EmployeeTeamTree: React.FC = () => {
  return (
    <EmployeeLayout pageTitle="Team Tree">
      <TeamTreeView />
    </EmployeeLayout>
  );
};
