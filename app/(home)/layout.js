"use client";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import PlainFooter from "@/components/common/PlainFooter";
import BackgroundImage from "@/public/images/bg/background6.jpg";
import { AuthProvider } from '@/context/AuthContext';
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./../globals.css";
import { usePathname } from 'next/navigation';

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className="relative">
      <AuthProvider>
        {/* Background - Only show if not home page */}
        {!isHomePage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
            style={{ backgroundImage: `url(${BackgroundImage.src})` }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black mix-blend-multiply opacity-70"></div>
          </div>
        )}
        <div className={`relative ${isHomePage ? '' : 'z-10'}`}>
          <Provider store={store}>
            <Navigation />
            <main className="relative z-10 top-[-75px]" style={{ minHeight: `calc(100vh - 182px)` }}>{children}</main>
            <Footer />
            <PlainFooter/>
          </Provider>
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
