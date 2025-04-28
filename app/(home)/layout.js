"use client";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import "./../globals.css";
import ClientLayout from './ClientLayout';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <ToastContainer />
        <Provider store={store}>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Provider>
      </body>
    </html>
  );
}
