
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
import { X } from 'lucide-react';

interface ProductFormProps {
  onSave: (product: any) => void;
  onCancel: () => void;
  initialData?: any;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  onSave,
  onCancel,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || Math.random().toString(36).substr(2, 9),
    name: initialData?.name || '',
    sku: initialData?.sku || '',
    category: initialData?.category || '',
    costPrice: initialData?.costPrice || '',
    sellingPrice: initialData?.sellingPrice || '',
    quantity: initialData?.quantity || '',
    minStock: initialData?.minStock || '',
    description: initialData?.description || '',
    supplier: initialData?.supplier || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.costPrice || !formData.sellingPrice || !formData.quantity) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    
    onSave({
      ...formData,
      costPrice: Number(formData.costPrice),
      sellingPrice: Number(formData.sellingPrice),
      quantity: Number(formData.quantity),
      minStock: Number(formData.minStock),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">
          {initialData ? 'تعديل منتج' : 'إضافة منتج جديد'}
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
          <Label htmlFor="name">اسم المنتج *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="أدخل اسم المنتج"
            dir="rtl"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">رقم المنتج (SKU)</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="مثال: EL-1234"
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">الفئة</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cables">كابلات</SelectItem>
              <SelectItem value="switches">مفاتيح</SelectItem>
              <SelectItem value="lighting">إضاءة</SelectItem>
              <SelectItem value="tools">أدوات</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">المورد</Label>
          <Select
            value={formData.supplier}
            onValueChange={(value) => handleSelectChange('supplier', value)}
          >
            <SelectTrigger id="supplier">
              <SelectValue placeholder="اختر المورد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="supplier1">شركة النور</SelectItem>
              <SelectItem value="supplier2">مؤسسة الكهرباء</SelectItem>
              <SelectItem value="supplier3">شركة الأفق</SelectItem>
              <SelectItem value="other">أخرى</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="costPrice">سعر التكلفة *</Label>
          <Input
            id="costPrice"
            name="costPrice"
            type="number"
            value={formData.costPrice}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sellingPrice">سعر البيع *</Label>
          <Input
            id="sellingPrice"
            name="sellingPrice"
            type="number"
            value={formData.sellingPrice}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">الكمية *</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="0"
            min="0"
            required
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minStock">الحد الأدنى للمخزون</Label>
          <Input
            id="minStock"
            name="minStock"
            type="number"
            value={formData.minStock}
            onChange={handleChange}
            placeholder="0"
            min="0"
            dir="rtl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">الوصف</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="وصف المنتج"
            rows={3}
            dir="rtl"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit">
          {initialData ? 'تحديث المنتج' : 'إضافة المنتج'}
        </Button>
      </div>
    </form>
  );
};
