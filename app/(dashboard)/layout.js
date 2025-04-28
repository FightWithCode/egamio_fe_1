"use client";
import Navigation from "@/components/common/Navigation";
import PlainFooter from "@/components/common/PlainFooter";
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
          <ToastContainer />
          <Provider store={store}>
            {/* Content */}
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1 p-4">{children}</main>
              <PlainFooter />
            </div>
          </Provider>
        </body>
    </html>
  );
}
