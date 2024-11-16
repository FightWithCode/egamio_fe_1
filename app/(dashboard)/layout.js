"use client";
import Navigation from "@/components/dashboard/Navigation";
import Footer from "@/components/dashboard/Footer";
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <Navigation />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
