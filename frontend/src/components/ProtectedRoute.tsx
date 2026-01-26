import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useClientAuth } from '@/hooks/useClientAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  userType?: 'employee' | 'client' | 'any';
}

export const ProtectedRoute = ({ 
  children, 
  requireAuth = true,
  userType = 'any' 
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated: isEmployeeAuth, loading: employeeLoading } = useAuth();
  const { isAuthenticated: isClientAuth, loading: clientLoading } = useClientAuth();

  const loading = employeeLoading || clientLoading;
  const isAuthenticated = isEmployeeAuth || isClientAuth;

  useEffect(() => {
    // If not authenticated and not loading, redirect will happen via Navigate
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    // Redirect to login, then back to the original location after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

