
'use client';
import { useState, useEffect } from 'react';
import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Bell, Truck, Tag } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const notifications = [
    {
      id: 1,
      icon: Truck,
      title: 'Order Delivered',
      description: 'Your order #ORD12345 has been delivered.',
      time: '2 hours ago',
    },
    {
      id: 2,
      icon: Tag,
      title: 'Special Offer!',
      description: 'Get 20% off on all vegetables this weekend.',
      time: '1 day ago',
    },
     {
      id: 3,
      icon: Truck,
      title: 'Order Shipped',
      description: 'Your order #ORD12345 is out for delivery.',
      time: '4 hours ago',
    },
  ];

export default function Home() {
  const [address, setAddress] = useState('123 Main St...');
  const [fullAddress, setFullAddress] = useState('123 Main St, Anytown, USA');
  const [coordinates, setCoordinates] = useState<{lat: number, lon: number} | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setCoordinates({ lat: position.coords.latitude, lon: position.coords.longitude });
          try {
            // Using a free, no-key reverse geocoding service for demonstration
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            );
            const data = await response.json();
            if (data && data.address) {
                const city = data.address.city || data.address.town || data.address.village || data.display_name.split(',')[0];
                setAddress(city);
                setFullAddress(data.display_name);
                toast({
                    title: 'Location Updated',
                    description: `Your delivery address has been set to: ${data.display_name}`,
                });
            } else if (data && data.display_name) {
                const city = data.display_name.split(',')[0];
                setAddress(city);
                setFullAddress(data.display_name);
                toast({
                    title: 'Location Updated',
                    description: `Your delivery address has been set to: ${data.display_name}`,
                });
            } else {
                setAddress('Address not found');
                setFullAddress('Could not determine full address.');
            }
          } catch (error) {
            console.error('Error fetching address:', error);
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'Could not fetch your address.',
            });
            setAddress('Could not fetch address');
            setFullAddress('Could not fetch address');
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          let description = 'An unknown error occurred.';
          if (error.code === error.PERMISSION_DENIED) {
            description = 'Please allow location access to use this feature.';
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            description = 'Location information is unavailable.';
          } else if (error.code === error.TIMEOUT) {
            description = 'The request to get user location timed out.';
          }
          toast({
            variant: 'destructive',
            title: 'Location Error',
            description,
          });
        }
      );
    } else {
      toast({
        variant: 'destructive',
        title: 'Unsupported',
        description: 'Geolocation is not supported by this browser.',
      });
    }
  };

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex items-center justify-between">
                {user ? (
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-2xl font-bold">Welcome{user.displayName ? `, ${user.displayName}` : ''}</h1>
                         <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Bell />
                                    <span className="sr-only">Notifications</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                                <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Notifications</h4>
                                    <p className="text-sm text-muted-foreground">
                                    You have {notifications.length} new messages.
                                    </p>
                                </div>
                                <div className="grid gap-2">
                                    {notifications.map((notification, index) => {
                                        const Icon = notification.icon;
                                        return (
                                        <React.Fragment key={notification.id}>
                                            <div className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                <Icon className="h-5 w-5 text-primary" />
                                                <div className="grid gap-1">
                                                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                                </div>
                                            </div>
                                            {index < notifications.length - 1 && <Separator />}
                                        </React.Fragment>
                                        )
                                    })}
                                </div>
                                </div>
                                <Button className="w-full mt-4" asChild>
                                    <Link href="/notifications">View all notifications</Link>
                                </Button>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button asChild variant="outline">
                            <Link href="/login">Sign In</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/login">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="cursor-pointer">
                            <p className="text-sm text-muted-foreground">Delivery to</p>
                            <span className="font-semibold truncate pr-2">{address}</span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                            <h4 className="font-medium leading-none">Full Address</h4>
                            <p className="text-sm text-muted-foreground">
                               {fullAddress}
                            </p>
                            </div>
                             {coordinates && (
                              <Button 
                                variant="outline" 
                                asChild
                              >
                                <a href={`https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lon}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  View on Map
                                </a>
                              </Button>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
                <Button variant="ghost" size="icon" onClick={handleLocationClick} aria-label="Get current location">
                  <MapPin className="h-6 w-6 text-foreground" />
                </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search for products" className="pl-12 h-14 rounded-full bg-muted/50 border-0 focus-visible:ring-primary" />
            </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 my-4">
        <div className="relative aspect-video md:aspect-[2/1] lg:aspect-[2.4/1] w-full rounded-2xl overflow-hidden">
            <Image 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop"
                alt="Fresh vegetables"
                fill
                className="object-cover"
                data-ai-hint="vegetables groceries"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex flex-col justify-end items-start text-left p-6 md:p-8">
                <div>
                    <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter">THE NATURAL STORY</h2>
                    <p className="text-green-200 text-sm mt-2 max-w-md">FRESH VEGETABLES OF WORK</p>
                    <p className="text-white font-bold text-xl mt-4">$81.45</p>
                </div>
            </div>
        </div>
      </div>
      
      <div className="py-4">
        <div className="overflow-x-auto">
            <div className="flex space-x-6 px-4">
                <Button variant="ghost" className="text-foreground font-bold relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary after:rounded-full pb-2 h-auto">Fruits</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Vegetables</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Snacks</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Drinks</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Bakery</Button>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Separator className="my-4" />
      </div>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

    
