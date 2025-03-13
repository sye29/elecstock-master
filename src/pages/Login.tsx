
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-accent to-background"
    >
      <LoginForm />
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 إلكتروستوك. جميع الحقوق محفوظة
        </p>
      </div>
    </div>
  );
};

export default Login;
