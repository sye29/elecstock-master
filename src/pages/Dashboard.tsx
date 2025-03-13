
import React from 'react';
import { Link } from 'react-router-dom';
import { Dashboard as DashboardComponent } from '@/components/dashboard/Dashboard';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link to="/inventory" className="block">
          <div className="bg-white rounded-lg border p-6 h-full hover:shadow-md transition-shadow">
            <Package className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-lg font-medium mb-1">إدارة المخزون</h2>
            <p className="text-muted-foreground text-sm">إضافة وتعديل المنتجات والمخزون</p>
          </div>
        </Link>
        
        <Link to="/purchases" className="block">
          <div className="bg-white rounded-lg border p-6 h-full hover:shadow-md transition-shadow">
            <ShoppingCart className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-lg font-medium mb-1">المشتريات</h2>
            <p className="text-muted-foreground text-sm">إدارة المشتريات والموردين</p>
          </div>
        </Link>
        
        <Link to="/sales" className="block">
          <div className="bg-white rounded-lg border p-6 h-full hover:shadow-md transition-shadow">
            <FileText className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-lg font-medium mb-1">المبيعات</h2>
            <p className="text-muted-foreground text-sm">إدارة المبيعات والفواتير</p>
          </div>
        </Link>
      </div>
      
      <DashboardComponent />
    </div>
  );
};

export default Dashboard;
