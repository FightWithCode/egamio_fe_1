"use client";
import Navigation from "@/components/common/Navigation";
import Footer from "@/components/common/Footer";
import PlainFooter from "@/components/common/PlainFooter";
import BackgroundImage from "@/public/images/bg/background6.jpg";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import "./../globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
          style={{ backgroundImage: `url(${BackgroundImage.src})` }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black mix-blend-multiply opacity-70"></div>
        </div>
        <div className="relative z-10">
          <Provider store={store}>
            <Navigation />
            <main style={{ minHeight: `calc(100vh - 182px)` }}>{children}</main>
            <Footer />
            <PlainFooter/>
          </Provider>
        </div>
      </body>
    </html>
  );
}
