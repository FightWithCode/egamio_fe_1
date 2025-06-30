// app/layout.js
"use client";
import { Provider } from 'react-redux';
import store from '@/store/store';

import Navigation from "@/components/common/Navigation";
import PlainFooter from "@/components/common/PlainFooter";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthInitWrapper from '@/components/common/AuthInitWrapper';

import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-background">
        <Provider store={store}>
          <AuthInitWrapper>
            <ToastContainer />
            <Navigation />
            <main style={{ minHeight: `calc(100vh - 182px)` }} className="m-2">
              {children}
            </main>
            <PlainFooter />
          </AuthInitWrapper>
        </Provider>
      </body>
    </html>
  );
}
