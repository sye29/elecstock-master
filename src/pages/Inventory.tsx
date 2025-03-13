
import React from 'react';
import { ProductList } from '@/components/inventory/ProductList';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductForm } from '@/components/inventory/ProductForm';
import { toast } from 'sonner';

const Inventory: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const handleAddProduct = (product: any) => {
    setIsOpen(false);
    toast.success('تم إضافة المنتج بنجاح');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">إدارة المخزون</h1>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>إضافة منتج جديد</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <ProductForm
              onSave={handleAddProduct}
              onCancel={() => setIsOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <ProductList />
    </div>
  );
};

export default Inventory;
