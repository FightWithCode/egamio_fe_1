// app/(home)/layout.jsx (Server Component)
import { AuthProvider } from '@/context/AuthContext';
import "./../globals.css";
import ClientLayout from './ClientLayout';

export const metadata = {
  metadataBase: new URL('https://egamio.com'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },  
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
  title: {
    default: 'Home | eGamio',
    template: '%s | eGamio'
  },
  description: 'Connect with gamers worldwide',
  keywords: ['gaming', 'esports', 'team finder', 'gamers'],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  // manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://egamio.com',
    siteName: 'eGamio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
