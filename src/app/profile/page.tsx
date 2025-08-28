
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Edit, Heart, Bell, HelpCircle, LogOut, MapPin, CreditCard, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.photoURL || "https://picsum.photos/200"} alt={user?.displayName || 'User'} />
          <AvatarFallback>
            {user?.displayName ? user.displayName.charAt(0) : <UserIcon />}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{user?.displayName || 'User'}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto" asChild>
          <Link href="/profile/create">
            <Edit className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <Link href="/favorites">
            <Card className="hover:bg-muted/50 cursor-pointer">
                <CardContent className="p-4 flex items-center">
                    <Heart className="h-6 w-6 mr-4 text-primary" />
                    <span>Favorites</span>
                </CardContent>
            </Card>
        </Link>
        <Card>
            <CardContent className="p-4 flex items-center">
                <MapPin className="h-6 w-6 mr-4 text-primary" />
                <span>Saved Addresses</span>
            </CardContent>
        </Card>
        <Card>
            <CardContent className="p-4 flex items-center">
                <CreditCard className="h-6 w-6 mr-4 text-primary" />
                <span>Payment Methods</span>
            </CardContent>
        </Card>
        <Link href="/notifications">
            <Card className="hover:bg-muted/50 cursor-pointer">
                <CardContent className="p-4 flex items-center">
                    <Bell className="h-6 w-6 mr-4 text-primary" />
                    <span>Notifications</span>
                </CardContent>
            </Card>
        </Link>
        <Link href="/support">
            <Card className="hover:bg-muted/50 cursor-pointer">
                <CardContent className="p-4 flex items-center">
                    <HelpCircle className="h-6 w-6 mr-4 text-primary" />
                    <span>Help & Support</span>
                </CardContent>
            </Card>
        </Link>
        <Separator />
        <Button variant="outline" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </Button>
      </div>
    </div>
  );
}
