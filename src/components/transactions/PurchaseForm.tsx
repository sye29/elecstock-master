
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { X, Plus, Trash2, Calculator, Calendar } from 'lucide-react';
import { Card } from '@/components/common/Card';

interface PurchaseFormProps {
  onSave: (purchase: any) => void;
  onCancel: () => void;
  initialData?: any;
}

// Sample product and supplier data
const products = [
  { id: '1', name: 'كابل كهرباء 2*1.5', price: 120 },
  { id: '2', name: 'مفتاح ثنائي', price: 15 },
  { id: '3', name: 'لمبة ليد 10 واط', price: 18 },
  { id: '4', name: 'علبة توزيع بلاستيك', price: 8 },
  { id: '5', name: 'قاطع كهرباء 32 أمبير', price: 45 },
];

const suppliers = [
  { id: 'supplier1', name: 'شركة النور' },
  { id: 'supplier2', name: 'مؤسسة الكهرباء' },
  { id: 'supplier3', name: 'شركة الأفق' },
];

export const PurchaseForm: React.FC<PurchaseFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || Math.random().toString(36).substr(2, 9),
    invoiceNumber: initialData?.invoiceNumber || '',
    supplier: initialData?.supplier || '',
    date: initialData?.date || new Date().toISOString().split('T')[0],
    paymentType: initialData?.paymentType || 'cash',
    paymentStatus: initialData?.paymentStatus || 'paid',
    notes: initialData?.notes || '',
  });

  const [items, setItems] = useState<Array<{
    id: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>>(initialData?.items || [
    { id: '1', productId: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    setItems(prev => {
      const newItems = [...prev];
      (newItems[index] as any)[field] = value;
      
      // If changing product, update unit price
      if (field === 'productId') {
        const selectedProduct = products.find(p => p.id === value);
        if (selectedProduct) {
          newItems[index].unitPrice = selectedProduct.price;
        }
      }
      
      // Calculate item total
      newItems[index].total = newItems[index].quantity * newItems[index].unitPrice;
      
      return newItems;
    });
  };

  const addItem = () => {
    setItems(prev => [
      ...prev,
      { id: Math.random().toString(36).substr(2, 9), productId: '', quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.supplier) {
      toast.error('يرجى اختيار المورد');
      return;
    }
    
    if (items.some(item => !item.productId || item.quantity <= 0)) {
      toast.error('يرجى إكمال جميع بيانات المنتجات');
      return;
    }
    
    onSave({
      ...formData,
      items,
      totalAmount: getTotalAmount(),
      date: formData.date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">
          {initialData ? 'تعديل فاتورة شراء' : 'إضافة فاتورة شراء جديدة'}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="rounded-full"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">رقم الفاتورة</Label>
          <Input
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            placeholder="أدخل رقم الفاتورة"
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">المورد *</Label>
          <Select
            value={formData.supplier}
            onValueChange={(value) => handleSelectChange('supplier', value)}
          >
            <SelectTrigger id="supplier">
              <SelectValue placeholder="اختر المورد" />
            </SelectTrigger>
            <SelectContent>
              {suppliers.map(supplier => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">تاريخ الفاتورة</Label>
          <div className="relative">
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="pr-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentType">طريقة الدفع</Label>
          <Select
            value={formData.paymentType}
            onValueChange={(value) => handleSelectChange('paymentType', value)}
          >
            <SelectTrigger id="paymentType">
              <SelectValue placeholder="اختر طريقة الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash">نقدي</SelectItem>
              <SelectItem value="credit">آجل</SelectItem>
              <SelectItem value="transfer">تحويل بنكي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentStatus">حالة الدفع</Label>
          <Select
            value={formData.paymentStatus}
            onValueChange={(value) => handleSelectChange('paymentStatus', value)}
          >
            <SelectTrigger id="paymentStatus">
              <SelectValue placeholder="اختر حالة الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paid">مدفوع</SelectItem>
              <SelectItem value="partial">مدفوع جزئياً</SelectItem>
              <SelectItem value="unpaid">غير مدفوع</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">المنتجات</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            <span>إضافة منتج</span>
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <Card key={item.id} className="p-4 border">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor={`product-${index}`}>المنتج *</Label>
                  <Select
                    value={item.productId}
                    onValueChange={(value) => handleItemChange(index, 'productId', value)}
                  >
                    <SelectTrigger id={`product-${index}`}>
                      <SelectValue placeholder="اختر المنتج" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(product => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor={`quantity-${index}`}>الكمية *</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 0)}
                    dir="rtl"
                  />
                </div>

                <div>
                  <Label htmlFor={`unitPrice-${index}`}>سعر الوحدة *</Label>
                  <Input
                    id={`unitPrice-${index}`}
                    type="number"
                    step="0.01"
                    min="0"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                    dir="rtl"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Label>الإجمالي</Label>
                    <div className="bg-muted/50 h-10 rounded-md flex items-center px-3 font-medium">
                      {item.total.toFixed(2)} ر.س
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="mb-[2px] text-muted-foreground hover:text-destructive"
                    disabled={items.length === 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">ملاحظات</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="أي ملاحظات إضافية..."
          rows={2}
          dir="rtl"
        />
      </div>

      <div className="flex justify-between items-end pt-4 border-t">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Calculator className="h-5 w-5" />
          </div>
          <div className="mr-3">
            <p className="text-sm font-medium text-muted-foreground">إجمالي الفاتورة</p>
            <p className="text-2xl font-bold">{getTotalAmount().toFixed(2)} ر.س</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            إلغاء
          </Button>
          <Button type="submit">
            {initialData ? 'تحديث الفاتورة' : 'حفظ الفاتورة'}
          </Button>
        </div>
      </div>
    </form>
  );
};
