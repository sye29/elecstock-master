
import React, { useState } from 'react';
import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ProductForm } from '@/components/inventory/ProductForm';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  Package
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { Card } from '@/components/common/Card';

// Sample product data
const initialProducts = [
  {
    id: '1',
    name: 'كابل كهرباء 2*1.5',
    sku: 'CAB-2015',
    category: 'cables',
    costPrice: 120,
    sellingPrice: 150,
    quantity: 50,
    minStock: 10,
    supplier: 'supplier1',
    status: 'in-stock',
  },
  {
    id: '2',
    name: 'مفتاح ثنائي',
    sku: 'SW-D200',
    category: 'switches',
    costPrice: 15,
    sellingPrice: 25,
    quantity: 100,
    minStock: 20,
    supplier: 'supplier2',
    status: 'in-stock',
  },
  {
    id: '3',
    name: 'لمبة ليد 10 واط',
    sku: 'LT-L010',
    category: 'lighting',
    costPrice: 18,
    sellingPrice: 30,
    quantity: 75,
    minStock: 15,
    supplier: 'supplier1',
    status: 'low-stock',
  },
  {
    id: '4',
    name: 'علبة توزيع بلاستيك',
    sku: 'BX-P100',
    category: 'other',
    costPrice: 8,
    sellingPrice: 15,
    quantity: 120,
    minStock: 30,
    supplier: 'supplier3',
    status: 'in-stock',
  },
  {
    id: '5',
    name: 'قاطع كهرباء 32 أمبير',
    sku: 'BRK-32A',
    category: 'switches',
    costPrice: 45,
    sellingPrice: 65,
    quantity: 30,
    minStock: 10,
    supplier: 'supplier2',
    status: 'in-stock',
  },
];

const categoryMap: Record<string, string> = {
  'cables': 'كابلات',
  'switches': 'مفاتيح',
  'lighting': 'إضاءة',
  'tools': 'أدوات',
  'other': 'أخرى',
};

const supplierMap: Record<string, string> = {
  'supplier1': 'شركة النور',
  'supplier2': 'مؤسسة الكهرباء',
  'supplier3': 'شركة الأفق',
  'other': 'أخرى',
};

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleAddProduct = (product: any) => {
    setProducts(prev => [...prev, product]);
    setIsOpen(false);
    toast.success('تم إضافة المنتج بنجاح');
  };

  const handleUpdateProduct = (product: any) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    setIsOpen(false);
    setEditingProduct(null);
    toast.success('تم تحديث المنتج بنجاح');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('تم حذف المنتج بنجاح');
  };

  const handleEditClick = (product: any) => {
    setEditingProduct(product);
    setIsOpen(true);
  };

  const columns = [
    {
      header: 'المنتج',
      accessor: 'name',
      cell: (value: string, item: any) => (
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2 rounded bg-primary/10 flex items-center justify-center">
            <Package className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium">{value}</div>
            <div className="text-xs text-muted-foreground">{item.sku}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'الفئة',
      accessor: (item: any) => categoryMap[item.category] || item.category,
    },
    {
      header: 'سعر التكلفة',
      accessor: 'costPrice',
      cell: (value: number) => (
        <span className="font-medium">{value} ر.س</span>
      ),
    },
    {
      header: 'سعر البيع',
      accessor: 'sellingPrice',
      cell: (value: number) => (
        <span className="font-medium">{value} ر.س</span>
      ),
    },
    {
      header: 'المخزون',
      accessor: 'quantity',
      cell: (value: number, item: any) => (
        <div>
          <span className={`font-medium ${
            value <= item.minStock ? 'text-red-500' : 'text-green-500'
          }`}>
            {value}
          </span>
          {value <= item.minStock && (
            <span className="text-xs text-red-500 block">
              أقل من الحد الأدنى ({item.minStock})
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'المورد',
      accessor: (item: any) => supplierMap[item.supplier] || item.supplier,
    },
  ];

  const actions = (product: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleEditClick(product)}>
          <Edit className="h-4 w-4 mr-2" />
          <span>تعديل</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDeleteProduct(product.id)}
          className="text-red-500 focus:text-red-500"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <span>حذف</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">قائمة المنتجات</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>إضافة منتج</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <ProductForm
              onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
              onCancel={() => {
                setIsOpen(false);
                setEditingProduct(null);
              }}
              initialData={editingProduct}
            />
          </DialogContent>
        </Dialog>
      </div>

      <DataTable
        data={products}
        columns={columns}
        keyField="id"
        actions={actions}
        emptyState={
          <div className="text-center py-10">
            <Package className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد منتجات</h3>
            <p className="text-muted-foreground mb-4">لم يتم إضافة أي منتجات بعد</p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  <span>إضافة منتج جديد</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <ProductForm
                  onSave={handleAddProduct}
                  onCancel={() => setIsOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        }
      />
    </Card>
  );
};
