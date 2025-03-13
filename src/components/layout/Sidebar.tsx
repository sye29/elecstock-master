
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Package,
  FileText,
  ShoppingCart,
  DollarSign,
  Users,
  Settings,
  HelpCircle,
} from 'lucide-react';

export const AppSidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  const menuItems = [
    { title: 'لوحة التحكم', path: '/dashboard', icon: LayoutDashboard },
    { title: 'المخزون', path: '/inventory', icon: Package },
    { title: 'المشتريات', path: '/purchases', icon: ShoppingCart },
    { title: 'المبيعات', path: '/sales', icon: DollarSign },
    { title: 'الفواتير', path: '/invoices', icon: FileText },
    { title: 'العملاء', path: '/customers', icon: Users },
    { title: 'الإعدادات', path: '/settings', icon: Settings },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="h-16" />
      <SidebarContent className="pt-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <NavLink to={item.path} end>
                {({ isActive }) => (
                  <SidebarMenuButton isActive={isActive} className="group">
                    <item.icon
                      className="h-4 w-4 mr-2 transition-transform duration-200 group-hover:scale-110"
                    />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="mb-2 mx-3 p-3 rounded-lg border border-sidebar-border flex items-center text-sm">
        <HelpCircle className="h-4 w-4 mr-2 text-sidebar-foreground/60" />
        <div className="flex-1">
          <p className="font-medium">بحاجة للمساعدة؟</p>
          <p className="text-xs text-sidebar-foreground/60">تواصل مع الدعم الفني</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
