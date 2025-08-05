import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientHeader from '../components/ClientHeader';
import Footer from '../components/Footer';
import { AuthProvider } from '../contexts/AuthContext';
import AuthModal from '../components/AuthModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stordial - Find Local Businesses',
  description: 'Discover and connect with the best local businesses in your area. Find restaurants, hotels, services, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <ClientHeader />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <AuthModal />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}