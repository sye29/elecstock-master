
import React from 'react';
import { Card } from '@/components/common/Card';
import { 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Users,
  FileCheck,
  Clock,
  AlertTriangle 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Dummy data for the charts
const salesData = [
  { name: 'يناير', total: 2400 },
  { name: 'فبراير', total: 1398 },
  { name: 'مارس', total: 9800 },
  { name: 'أبريل', total: 3908 },
  { name: 'مايو', total: 4800 },
  { name: 'يونيو', total: 3800 },
  { name: 'يوليو', total: 4300 },
];

const categoryData = [
  { name: 'كابلات', value: 400 },
  { name: 'مفاتيح', value: 300 },
  { name: 'إضاءة', value: 300 },
  { name: 'أدوات', value: 200 },
  { name: 'أخرى', value: 100 },
];

const inventoryData = [
  { name: 'كابلات', stock: 40, sales: 24 },
  { name: 'مفاتيح', stock: 30, sales: 13 },
  { name: 'إضاءة', stock: 20, sales: 98 },
  { name: 'أدوات', stock: 27, sales: 39 },
  { name: 'أخرى', stock: 18, sales: 48 },
];

const lowStockItems = [
  { name: 'كابل كهرباء 2*1.5', stock: 5, threshold: 10 },
  { name: 'مفتاح ثنائي', stock: 3, threshold: 15 },
  { name: 'لمبة ليد 10 واط', stock: 7, threshold: 20 },
];

const recentTransactions = [
  { id: 1, type: 'sale', customer: 'أحمد خالد', amount: 245, date: '2023-06-01' },
  { id: 2, type: 'purchase', supplier: 'شركة النور', amount: 1200, date: '2023-05-28' },
  { id: 3, type: 'sale', customer: 'محمد علي', amount: 540, date: '2023-05-25' },
  { id: 4, type: 'sale', customer: 'سارة أحمد', amount: 120, date: '2023-05-23' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          hover
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">المبيعات</p>
              <h3 className="text-2xl font-bold mt-1">12,628 ر.س</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>زيادة 12% عن الشهر الماضي</span>
          </div>
        </Card>

        <Card 
          hover
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">المشتريات</p>
              <h3 className="text-2xl font-bold mt-1">8,350 ر.س</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShoppingCart className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <span>280 عملية شراء هذا الشهر</span>
          </div>
        </Card>

        <Card 
          hover
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">المخزون</p>
              <h3 className="text-2xl font-bold mt-1">1,423 منتج</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Package className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-red-500">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>15 منتج أقل من الحد الأدنى</span>
          </div>
        </Card>

        <Card 
          hover
          className="flex flex-col"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground">العملاء</p>
              <h3 className="text-2xl font-bold mt-1">84 عميل</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-green-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>12 عميل جديد هذا الشهر</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="المبيعات الشهرية" className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={salesData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary) / 0.2)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="توزيع المخزون">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={inventoryData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#8884d8" name="المخزون" />
                <Bar dataKey="sales" fill="#82ca9d" name="المبيعات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="فئات المنتجات">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          title="مخزون منخفض"
          icon={<AlertTriangle className="h-4 w-4" />}
          description="المنتجات التي وصلت إلى الحد الأدنى للمخزون"
        >
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">الحد الأدنى: {item.threshold}</p>
                  </div>
                </div>
                <div className="text-red-500 font-semibold">
                  {item.stock}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card
          title="أحدث المعاملات"
          icon={<Clock className="h-4 w-4" />}
          description="آخر عمليات البيع والشراء"
        >
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-md flex items-center justify-center mr-3 ${
                    transaction.type === 'sale' 
                      ? 'bg-green-100 text-green-500' 
                      : 'bg-blue-100 text-blue-500'
                  }`}>
                    {transaction.type === 'sale' ? (
                      <DollarSign className="h-5 w-5" />
                    ) : (
                      <ShoppingCart className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {transaction.type === 'sale' 
                        ? `بيع إلى ${transaction.customer}` 
                        : `شراء من ${transaction.supplier}`}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'sale' ? 'text-green-500' : 'text-blue-500'
                }`}>
                  {transaction.type === 'sale' ? '+' : '-'}{transaction.amount} ر.س
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
