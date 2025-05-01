"use client";
import { Provider } from 'react-redux';
import store from '@/context/store';
import Navigation from "@/components/common/Navigation";
import PlainFooter from "@/components/common/PlainFooter";
import BackgroundImage from "@/public/images/bg/background6.jpg";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-background">
        <Provider store={store}>
          <ToastContainer />
          <Navigation />
          <main style={{ minHeight: `calc(100vh - 182px)` }} className="m-2">
            {children}
          </main>
          <PlainFooter />
        </Provider>
      </body>
    </html>
  );
}
