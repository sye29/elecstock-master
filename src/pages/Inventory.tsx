
import React from 'react';
import { ProductList } from '@/components/inventory/ProductList';

const Inventory: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">إدارة المخزون</h1>
      <ProductList />
    </div>
  );
};

export default Inventory;
