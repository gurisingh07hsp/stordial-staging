import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientHeader from '../components/ClientHeader';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { Providers } from './providers';
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stordial.com"),
  title: 'Find & Compare Local Businesses Near You | Stordial',
  description: 'Discover trusted local businesses on Stordial. Compare ratings, read real reviews, and connect instantly with the best services near you.',
  verification: {
    google: "N61LeFw-PwRB43fxm7OGjrtbtUbA-XK3WS-Iw38gGq8",
  },
  alternates:{
    canonical: '/'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
    <head>
       <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5D75P93DCH"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5D75P93DCH');
          `}
        </Script>
    </head>
      <body className={inter.className}>
        {/* <AuthProvider> */}
         <Providers>
          <div className="min-h-screen flex flex-col">
            <ClientHeader />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <AuthModal />
          </div>
        {/* </AuthProvider> */}
        </Providers>
      </body>
    </html>
  );
}