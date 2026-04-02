"use client";

import { Provider } from 'react-redux';
import store from '@/store/store';

import AuthInitWrapper from '@/components/authentication/AuthInitWrapper';
import AuthNavigation from '@/components/common/AuthNavigation';
import UnauthenticatedNav from '@/components/common/UnauthenticatedNav';
import Footer from '@/components/common/Footer';
import PlainFooter from '@/components/common/PlainFooter';

import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import './../globals.css';

function LayoutContent({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className={`relative ${isHomePage ? 'bg-background' : 'z-10'} flex flex-col flex-1 `}>
      {isAuthenticated ? <AuthNavigation /> : <UnauthenticatedNav />}

      <main className={`flex-1 flex justify-center items-center relative z-10 ${isHomePage ? 'top-[-75px]': 'top-0'}`}>
        {children}
      </main>

      <PlainFooter/>
    </div>
  );
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-background min-h-screen flex flex-col">
        <Provider store={store}>
          <AuthInitWrapper />
          <ToastContainer />
          <LayoutContent>{children}</LayoutContent>
        </Provider>
      </body>
    </html>
  );
}
