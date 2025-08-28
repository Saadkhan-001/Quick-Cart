import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/cart-context';
import { FavoritesProvider } from '@/contexts/favorites-context';
import { AppStateProvider } from '@/contexts/app-state-context';
import AppContent from './app-content';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
