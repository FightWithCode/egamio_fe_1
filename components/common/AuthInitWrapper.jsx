"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyAuth } from '@/store/slices/authSlice';
import { usePathname, useRouter } from 'next/navigation';

export default function AuthInitWrapper({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) return;

    dispatch(verifyAuth())
      .unwrap()
      .catch(() => {
        router.push('/login');
      });
  }, []);

  return <>{children}</>;
}
