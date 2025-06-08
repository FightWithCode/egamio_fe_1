"use client";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyAuth } from '@/store/slices/authSlice';

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  return children;
}
