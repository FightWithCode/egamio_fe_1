"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAuth } from "@/store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";

export default function AuthInitWrapper() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const syncAuth = async () => {
      try {
        await dispatch(verifyAuth()).unwrap();
      } catch (err) {
        // if path is protected, redirect to login
        const unprotectedRoutes = ["/", "/about-us", "/eg-threads", "/eg-clips", "/login", "/signup"];
        const isProtected = !unprotectedRoutes.includes(pathname);

        if (isProtected) {
          router.push(`/login?redirect=${pathname}`);
        }
      }
    };

    syncAuth();
  }, [dispatch, pathname, router]);

  return null; // koi UI nahi dikhana
}
