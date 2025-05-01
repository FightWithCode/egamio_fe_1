"use client";

import "./../globals.css";
import ClientLayout from './ClientLayout';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/context/store';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <Provider store={store}>
          <ToastContainer />
          <ClientLayout>
            {children}
          </ClientLayout>
        </Provider>
      </body>
    </html>
  );
}
