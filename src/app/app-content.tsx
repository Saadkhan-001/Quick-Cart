'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAppState } from '@/contexts/app-state-context';
import { useEffect, useState } from 'react';
import { Header } from '@/components/header';
import { BottomNav } from '@/components/bottom-nav';
import { products } from '@/lib/products';
import { useIsMobile } from '@/hooks/use-mobile';

export default function AppContent({ children }: { children: React.ReactNode }) {
  const { hasSeenWelcome, setHasSeenWelcome } = useAppState();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitial, setIsInitial] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInitial) {
        // Redirect logic should only run on initial load
        if (!hasSeenWelcome && !['/onboarding', '/login'].includes(pathname)) {
            router.replace('/onboarding');
        }
        setIsInitial(false);
    }
  }, [hasSeenWelcome, router, pathname, isInitial]);

  // If we are still figuring out where to go, show a loading state
  // or a blank page to avoid flicker.
  if (isInitial && !hasSeenWelcome && !['/onboarding', '/login'].includes(pathname)) {
    return null; // or a loading spinner
  }

  const showNav = !['/onboarding', '/login'].includes(pathname);

  return (
    <div className="relative flex min-h-screen flex-col">
      {showNav && !isMobile && <Header />}
      <main className={`flex-1 ${showNav ? 'pb-16 md:pb-0' : ''}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
