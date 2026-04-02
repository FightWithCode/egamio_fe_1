"use client";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated && pathname !== '/login') {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, pathname, router]);

  if (loading) return <div>Loading...</div>;
  return children;
}
