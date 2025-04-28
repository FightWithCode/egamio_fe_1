"use client";

import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import PlainFooter from "@/components/common/PlainFooter";
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from "@/redux/store";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <Provider store={store}>
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        <Navigation />
        <main className="flex-1 p-4">
          {children}
        </main>
        <PlainFooter />
      </div>
    </Provider>
  );
}
