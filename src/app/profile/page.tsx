
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heart, Bell, HelpCircle, LogOut, MapPin, CreditCard, User as UserIcon, ArrowLeft, Edit2 } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const settingsItems = [
  { href: '/profile/addresses', icon: MapPin, label: 'Saved Addresses' },
  { href: '/profile/payments', icon: CreditCard, label: 'Payment Methods' },
  { href: '/favorites', icon: Heart, label: 'Favorites' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
  { href: '/support', icon: HelpCircle, label: 'Support' },
];

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: error.message,
      });
    }
  };

  return (
     <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                 <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-xl font-bold">Account</h1>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
                 <Avatar className="h-28 w-28 border-4 border-primary/20">
                    <AvatarImage src={user?.photoURL || "https://picsum.photos/200"} alt={user?.displayName || 'User'} data-ai-hint="user avatar" />
                    <AvatarFallback>
                        {user?.displayName ? user.displayName.charAt(0) : <UserIcon className="h-12 w-12 text-muted-foreground" />}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold">{user?.displayName || 'Sophia Chen'}</h1>
                    <p className="text-muted-foreground">{user?.email || 'sophia.chen@email.com'}</p>
                </div>
                 <Button variant="outline" className="w-full max-w-sm" asChild>
                    <Link href="/profile/create">
                        <Edit2 className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </Button>
            </div>

            <div className="space-y-2">
                <h2 className="text-lg font-semibold px-4 mb-2">Settings</h2>
                <div className="rounded-lg border">
                    {settingsItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={item.label}>
                                <Link href={item.href}>
                                    <div className="flex items-center p-4 rounded-lg hover:bg-muted/50 cursor-pointer">
                                        <div className="p-3 bg-secondary rounded-lg mr-4">
                                            <Icon className="h-6 w-6 text-secondary-foreground" />
                                        </div>
                                        <span>{item.label}</span>
                                    </div>
                                </Link>
                                {index < settingsItems.length - 1 && <Separator />}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="mt-8">
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                </Button>
            </div>
        </div>
      </main>
    </div>
  );
}
