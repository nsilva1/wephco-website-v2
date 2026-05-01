'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
import { Loader } from './Loader';

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo?: string;
  loadingComponent?: React.ReactNode;
}

const PrivateRoute = ({
  children,
  redirectTo = '/auth/login',
  loadingComponent = <Loader size='lg' />,
}: PrivateRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const isLoading = loading;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  if (isLoading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <div>{children}</div>;
  }

  return <div>{loadingComponent}</div>;
};

export { PrivateRoute };
