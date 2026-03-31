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
    openGraph: {
    title: "Find & Compare Local Businesses Near You | Stordial",
    description:
      "Discover trusted local businesses on Stordial. Compare ratings, read real reviews, and connect instantly with the best services near you.",
    url: "https://www.stordial.com",
    siteName: "Stordial",
    images: [
      {
        url: "https://www.stordial.com/Stordial.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

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
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2777415313418867"
          crossOrigin="anonymous"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5D75P93DCH');
          `}
        </Script>

        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Stordial",
            url: "https://www.stordial.com",
            description:
              "India's local business directory - find restaurants, hotels, hospitals, and more near you.",
            logo: "https://www.stordial.com/Stordial crop.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-75890-75361",
              contactType: "customer service",
            },
            sameAs: [
              "https://facebook.com/stordial",
              "https://instagram.com/stordial",
              "https://linkedin.com/company/stordial",
            ],
          })}
        </Script>

        {/* Website Schema */}
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Stordial",
            url: "https://www.stordial.com",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://www.stordial.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
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