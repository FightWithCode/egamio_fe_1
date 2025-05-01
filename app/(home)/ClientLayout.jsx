"use client";

import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import PlainFooter from "@/components/common/PlainFooter";
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      <div className={`relative bg-background ${isHomePage ? 'bg-background' : 'z-10'}`}>
        <Navigation />
        <main className="relative z-10 top-[-75px]" style={{ minHeight: `calc(100vh - 182px)` }}>
          {children}
        </main>
        <Footer />
        <PlainFooter/>
      </div>
    </>
  );
}
