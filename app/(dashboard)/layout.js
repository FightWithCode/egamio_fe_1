// layout.js
"use client";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from '@/store/store';
import { verifyAuth } from '@/store/slices/authSlice';

import Navigation from "@/components/common/Navigation";
import PlainFooter from "@/components/common/PlainFooter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./../globals.css";

function AuthVerifier({ children }) {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only verify auth if not already authenticated and not loading
    if (!isAuthenticated && !loading) {
      dispatch(verifyAuth());
    }
  }, [dispatch, isAuthenticated, loading]);

  return children;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-background">
        <Provider store={store}>
          <AuthVerifier>
            <ToastContainer />
            <Navigation />
            <main style={{ minHeight: `calc(100vh - 182px)` }} className="m-2">
              {children}
            </main>
            <PlainFooter />
          </AuthVerifier>
        </Provider>
      </body>
    </html>
  );
}