import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { Role } from '../../types';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: Role;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    // Redirect to their own dashboard
    const dashPath = user.role === 'citizen' ? '/citizen/dashboard'
      : user.role === 'officer' ? '/officer/dashboard'
      : '/admin/dashboard';
    return <Navigate to={dashPath} replace />;
  }

  return <>{children}</>;
}
