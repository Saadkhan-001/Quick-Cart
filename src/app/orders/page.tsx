
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const pastOrders = [
  {
    id: 'ORD12345',
    date: '2023-10-26',
    status: 'Delivered',
    total: 25.4,
    items: [
      { name: 'Organic Bananas', imageUrl: 'https://picsum.photos/100/101', hint: 'bananas fruit' },
      { name: 'Whole Milk', imageUrl: 'https://picsum.photos/100/102', hint: 'milk carton' },
    ],
  },
  {
    id: 'ORD12346',
    date: '2023-10-20',
    status: 'Delivered',
    total: 15.99,
    items: [
      { name: 'Artisan Bread', imageUrl: 'https://picsum.photos/100/103', hint: 'bread loaf' },
    ],
  },
];

export default function OrdersHistoryPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                <h1 className="text-xl font-bold">Your Orders</h1>
            </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 space-y-6">
          {pastOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint={item.hint}
                      />
                    </div>
                  ))}
                </div>
                <Separator />
                 <div className="flex justify-between items-center">
                   <p className="font-semibold">Total</p>
                   <p className="font-bold">${order.total.toFixed(2)}</p>
                 </div>
              </CardContent>
              <CardFooter className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  Reorder
                </Button>
                <Button asChild className="w-full">
                    <Link href="/track-order">Track</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
