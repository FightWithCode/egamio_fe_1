"use client";
import Navigation from "@/components/common/Navigation";
import PlainFooter from "@/components/common/PlainFooter";
import BackgroundImage from "@/public/images/bg/background6.jpg";
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <ToastContainer />
        <AuthProvider>
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
            style={{ backgroundImage: `url(${BackgroundImage.src})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black mix-blend-multiply opacity-70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <AuthProvider>
              <Navigation />
              <main style={{ minHeight: `calc(100vh - 182px)` }} className="m-2">{children}</main>
              <PlainFooter />
            </AuthProvider>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
