
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // إذا كان المستخدم مسجل الدخول، قم بتوجيهه مباشرة إلى لوحة التحكم
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-background p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-8 text-center">
        <div className="space-y-2">
          <div className="inline-flex p-3 rounded-full bg-primary/10 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary"
            >
              <path d="M6.3 6.3a8 8 0 0 0 11.4 11.4" />
              <path d="m19 5-7 7" />
              <path d="M5 19 12 12" />
              <path d="M12 12 5.4 5.4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">إلكتروستوك</h1>
          <p className="text-muted-foreground">نظام إدارة متجر الأدوات الكهربائية</p>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            مرحبًا بك في نظام إدارة متجر الأدوات الكهربائية. يمكنك إدارة المخزون والمبيعات والمشتريات بسهولة.
          </p>
          
          {isAuthenticated ? (
            <Button asChild className="w-full">
              <Link to="/dashboard">الذهاب إلى لوحة التحكم</Link>
            </Button>
          ) : (
            <Button asChild className="w-full">
              <Link to="/login">تسجيل الدخول</Link>
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="mt-4">© 2024 إلكتروستوك. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
