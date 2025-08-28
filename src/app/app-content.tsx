'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useAppState } from '@/contexts/app-state-context';
import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/bottom-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreateProfileHeader } from '@/components/create-profile-header';

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

  const showNav = !['/onboarding', '/login', '/profile/create'].includes(pathname);
  const showCreateProfileHeader = pathname === '/profile/create';


  return (
    <div className="relative flex min-h-screen flex-col">
      {showCreateProfileHeader && <CreateProfileHeader />}
      <main className={`flex-1 ${showNav ? 'pb-20 md:pb-0' : ''} ${showCreateProfileHeader ? 'pb-16 md:pb-0' : ''}`}>
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
