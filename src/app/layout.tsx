import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/cart-context';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { AppStateProvider } from '@/contexts/app-state-context';
import AppContent from './app-content';

export const metadata: Metadata = {
  title: 'Quick Cart',
  description: 'Modern, minimal, and user-friendly mobile app for grocery and online ordering.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AppStateProvider>
          <FavoritesProvider>
            <CartProvider>
              <AppContent>
                {children}
              </AppContent>
              <Toaster />
            </CartProvider>
          </FavoritesProvider>
        </AppStateProvider>
      </body>
    </html>
  );
}
