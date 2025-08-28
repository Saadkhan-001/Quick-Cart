
'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAppState } from '@/contexts/app-state-context';
import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/bottom-nav';
import { CreateProfileHeader } from '@/components/create-profile-header';

export default function AppContent({ children }: { children: React.ReactNode }) {
  const { hasSeenWelcome } = useAppState();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);

  useEffect(() => {
    // hasSeenWelcome is initially read from localStorage in AppStateProvider
    // but it might not be available on the very first render.
    // The value of hasSeenWelcome can be undefined initially, then false, then true.
    // We should only perform the check once we have a definitive value.
    if (typeof hasSeenWelcome === 'boolean') {
      if (!hasSeenWelcome && !['/onboarding', '/login', '/profile/create'].includes(pathname)) {
        router.replace('/onboarding');
      }
      setIsInitialCheckComplete(true);
    }
  }, [hasSeenWelcome, router, pathname]);

  // Render nothing until we've determined the correct route, to prevent flicker.
  if (!isInitialCheckComplete) {
    return null; // Or a loading spinner
  }

  const showNav = !['/onboarding', '/login', '/profile/create'].includes(pathname);
  const showCreateProfileHeader = pathname === '/profile/create';


  return (
    <div className="relative flex min-h-screen flex-col">
      {showCreateProfileHeader && <CreateProfileHeader />}
      <main className={`flex-1 ${showNav ? 'pb-20 md:pb-0' : ''}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
