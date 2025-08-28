'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Edit, Heart, Bell, HelpCircle, LogOut, MapPin, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://picsum.photos/200" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-muted-foreground">john.doe@example.com</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Edit className="h-5 w-5" />
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
        <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </Button>
      </div>
    </div>
  );
}
