'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function CreateProfileHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="relative flex w-full items-center justify-center">
            <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                <ArrowLeft />
                 <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-xl font-bold">Profile</h1>
        </div>
      </div>
    </header>
  );
}
