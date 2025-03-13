
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl border shadow-sm animate-scale-in">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M6.3 6.3a8 8 0 0 0 11.4 11.4" />
            <path d="m19 5-7 7" />
            <path d="M5 19 12 12" />
            <path d="M12 12 5.4 5.4" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">تسجيل الدخول</h1>
        <p className="text-sm text-muted-foreground">أدخل بيانات الدخول للوصول إلى لوحة التحكم</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium">
              اسم المستخدم
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-focus"
              placeholder="أدخل اسم المستخدم"
              autoComplete="username"
              dir="rtl"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                كلمة المرور
              </label>
              <a
                href="#"
                className="text-xs text-primary hover:underline"
              >
                نسيت كلمة المرور؟
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-focus"
              placeholder="أدخل كلمة المرور"
              autoComplete="current-password"
              dir="rtl"
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full btn-press"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {isLoading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
        </Button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        <p>بيانات الدخول الافتراضية للتجربة:</p>
        <p className="font-medium">اسم المستخدم: admin</p>
        <p className="font-medium">كلمة المرور: admin123</p>
      </div>
    </div>
  );
};
