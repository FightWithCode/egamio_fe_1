"use client";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    // Wait for verifyAuth to finish
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Optional: Show loader while checking
  if (loading) return <div>Loading...</div>;

  return children;
}
