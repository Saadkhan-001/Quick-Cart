'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf } from 'lucide-react';
import { useAppState } from '@/contexts/app-state-context';

export default function WelcomePage() {
  const router = useRouter();
  const { setHasSeenWelcome } = useAppState();

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSeenWelcome(true);
      router.push('/onboarding');
    }, 3000); 

    return () => clearTimeout(timer);
  }, [router, setHasSeenWelcome]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <Leaf className="h-24 w-24 text-primary mx-auto" />
        <h1 className="mt-4 text-4xl font-bold text-gray-800">Quick Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">'Your groceries, just a tap away'.</p>
      </div>
      <div className="absolute bottom-16">
        <div className="loading-dots">
          <span className="dot-1"></span>
          <span className="dot-2"></span>
          <span className="dot-3"></span>
        </div>
      </div>
    </div>
  );
}
