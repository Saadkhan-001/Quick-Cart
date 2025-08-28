
'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import React from 'react';

const pastOrders = [
  {
    id: '789012',
    date: '2023-10-26',
    status: 'Delivered',
    total: 65.2,
    itemCount: 5,
    imageUrl: 'https://picsum.photos/200/200?random=1',
    hint: 'shopping bag',
  },
  {
    id: '345678',
    date: '2023-10-20',
    status: 'Delivered',
    total: 32.50,
    itemCount: 3,
    imageUrl: 'https://picsum.photos/200/200?random=2',
    hint: 'grocery bag',
  },
  {
    id: '901234',
    date: '2023-10-18',
    status: 'Delivered',
    total: 18.75,
    itemCount: 2,
    imageUrl: 'https://picsum.photos/200/200?random=3',
    hint: 'paper bag',
  },
  {
    id: '567890',
    date: '2023-10-15',
    status: 'Delivered',
    total: 48.90,
    itemCount: 4,
    imageUrl: 'https://picsum.photos/200/200?random=4',
    hint: 'tote bag',
  },
];

export default function OrdersHistoryPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                 <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-xl font-bold">Orders</h1>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-6">
            {pastOrders.map((order, index) => (
              <React.Fragment key={order.id}>
                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={order.imageUrl}
                      alt={`Order #${order.id}`}
                      fill
                      className="rounded-lg object-cover"
                      data-ai-hint={order.hint}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                    <p className="text-muted-foreground">Total: ${order.total.toFixed(2)}</p>
                    <p className="text-muted-foreground">{order.status} · {order.itemCount} items</p>
                  </div>
                  <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">Reorder</Button>
                      <Button asChild size="sm">
                        <Link href="/track-order">Track</Link>
                      </Button>
                  </div>
                </div>
                {index < pastOrders.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
