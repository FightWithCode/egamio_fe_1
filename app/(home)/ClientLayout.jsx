"use client";

import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import PlainFooter from "@/components/common/PlainFooter";
import BackgroundImage from "@/public/images/bg/background6.jpg";
import { usePathname } from 'next/navigation';
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Provider store={store}>
      {!isHomePage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
          style={{ backgroundImage: `url(${BackgroundImage.src})` }}
        >
          <div className="absolute inset-0 bg-black mix-blend-multiply opacity-70"></div>
        </div>
      )}
      <div className={`relative ${isHomePage ? 'bg-background' : 'z-10'}`}>
        <Navigation />
        <main className="relative z-10 top-[-75px]" style={{ minHeight: `calc(100vh - 182px)` }}>
          {children}
        </main>
        <Footer />
        <PlainFooter/>
      </div>
    </Provider>
  );
}
