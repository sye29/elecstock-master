
import React from 'react';
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;
