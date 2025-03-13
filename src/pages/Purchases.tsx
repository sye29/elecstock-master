
import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/common/DataTable';
import { 
  Plus, 
  ShoppingCart, 
  FileText, 
  CreditCard,
  MoreHorizontal,
  Edit,
  Trash2,
  Printer,
  Eye,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PurchaseForm } from '@/components/transactions/PurchaseForm';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

// Sample data for purchases
const initialPurchases = [
  {
    id: '1',
    invoiceNumber: 'INV-001',
    supplier: 'supplier1',
    supplierName: 'شركة النور',
    date: '2023-06-10',
    totalAmount: 2500,
    paymentType: 'cash',
    paymentStatus: 'paid',
    items: [
      { id: '1', productId: '1', quantity: 10, unitPrice: 120, total: 1200 },
      { id: '2', productId: '3', quantity: 15, unitPrice: 18, total: 270 },
      { id: '3', productId: '5', quantity: 23, unitPrice: 45, total: 1035 },
    ],
  },
  {
    id: '2',
    invoiceNumber: 'INV-002',
    supplier: 'supplier2',
    supplierName: 'مؤسسة الكهرباء',
    date: '2023-06-05',
    totalAmount: 1800,
    paymentType: 'credit',
    paymentStatus: 'unpaid',
    items: [
      { id: '1', productId: '2', quantity: 50, unitPrice: 15, total: 750 },
      { id: '2', productId: '4', quantity: 100, unitPrice: 8, total: 800 },
      { id: '3', productId: '3', quantity: 15, unitPrice: 18, total: 270 },
    ],
  },
  {
    id: '3',
    invoiceNumber: 'INV-003',
    supplier: 'supplier3',
    supplierName: 'شركة الأفق',
    date: '2023-05-28',
    totalAmount: 4200,
    paymentType: 'transfer',
    paymentStatus: 'partial',
    items: [
      { id: '1', productId: '1', quantity: 20, unitPrice: 120, total: 2400 },
      { id: '2', productId: '5', quantity: 40, unitPrice: 45, total: 1800 },
    ],
  },
];

const paymentStatusMap: Record<string, { label: string, color: string }> = {
  'paid': { label: 'مدفوع', color: 'bg-green-100 text-green-800' },
  'partial': { label: 'مدفوع جزئياً', color: 'bg-yellow-100 text-yellow-800' },
  'unpaid': { label: 'غير مدفوع', color: 'bg-red-100 text-red-800' },
};

const paymentTypeMap: Record<string, string> = {
  'cash': 'نقدي',
  'credit': 'آجل',
  'transfer': 'تحويل بنكي',
};

const Purchases: React.FC = () => {
  const [purchases, setPurchases] = useState(initialPurchases);
  const [isOpen, setIsOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<any>(null);

  const handleAddPurchase = (purchase: any) => {
    // Add supplier name to the purchase object
    const supplierName = initialPurchases.find(p => p.supplier === purchase.supplier)?.supplierName || '';
    const newPurchase = { ...purchase, supplierName };
    
    setPurchases(prev => [newPurchase, ...prev]);
    setIsOpen(false);
    toast.success('تم إضافة فاتورة الشراء بنجاح');
  };

  const handleUpdatePurchase = (purchase: any) => {
    // Maintain supplier name in the updated object
    const supplierName = initialPurchases.find(p => p.supplier === purchase.supplier)?.supplierName || '';
    const updatedPurchase = { ...purchase, supplierName };
    
    setPurchases(prev => prev.map(p => p.id === purchase.id ? updatedPurchase : p));
    setIsOpen(false);
    setEditingPurchase(null);
    toast.success('تم تحديث فاتورة الشراء بنجاح');
  };

  const handleDeletePurchase = (id: string) => {
    setPurchases(prev => prev.filter(p => p.id !== id));
    toast.success('تم حذف فاتورة الشراء بنجاح');
  };

  const handleEditClick = (purchase: any) => {
    setEditingPurchase(purchase);
    setIsOpen(true);
  };

  const columns = [
    {
      header: 'رقم الفاتورة',
      accessor: 'invoiceNumber',
      cell: (value: string) => (
        <div className="flex items-center">
          <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="font-medium">{value}</span>
        </div>
      ),
    },
    {
      header: 'المورد',
      accessor: 'supplierName',
    },
    {
      header: 'التاريخ',
      accessor: 'date',
      cell: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString('ar-SA');
      },
    },
    {
      header: 'المبلغ',
      accessor: 'totalAmount',
      cell: (value: number) => (
        <span className="font-medium">{value.toFixed(2)} ر.س</span>
      ),
    },
    {
      header: 'طريقة الدفع',
      accessor: (item: any) => paymentTypeMap[item.paymentType] || item.paymentType,
    },
    {
      header: 'حالة الدفع',
      accessor: (item: any) => item.paymentStatus,
      cell: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatusMap[value]?.color}`}>
          {paymentStatusMap[value]?.label || value}
        </span>
      ),
    },
  ];

  const actions = (purchase: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toast.info('جاري عرض تفاصيل الفاتورة...')}>
          <Eye className="h-4 w-4 mr-2" />
          <span>عرض التفاصيل</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleEditClick(purchase)}>
          <Edit className="h-4 w-4 mr-2" />
          <span>تعديل</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => toast.info('جاري طباعة الفاتورة...')}>
          <Printer className="h-4 w-4 mr-2" />
          <span>طباعة</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleDeletePurchase(purchase.id)}
          className="text-red-500 focus:text-red-500"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          <span>حذف</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">المشتريات</h1>

      <Card className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">فواتير الشراء</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="flex items-center gap-1">
                <Plus className="h-4 w-4" />
                <span>إضافة فاتورة</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <PurchaseForm
                onSave={editingPurchase ? handleUpdatePurchase : handleAddPurchase}
                onCancel={() => {
                  setIsOpen(false);
                  setEditingPurchase(null);
                }}
                initialData={editingPurchase}
              />
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          data={purchases}
          columns={columns}
          keyField="id"
          actions={actions}
          emptyState={
            <div className="text-center py-10">
              <ShoppingCart className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">لا توجد فواتير شراء</h3>
              <p className="text-muted-foreground mb-4">لم يتم إضافة أي فواتير شراء بعد</p>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    <span>إضافة فاتورة شراء جديدة</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <PurchaseForm
                    onSave={handleAddPurchase}
                    onCancel={() => setIsOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default Purchases;
