
'use client';
import { Button } from '@/components/ui/button';
import { Check, CheckCircle, Package, Truck, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const timeline = [
  { status: 'Order Placed', time: '10:00 AM', icon: Check, completed: true },
  { status: 'Packed', time: '10:30 AM', icon: Check, completed: true },
  { status: 'Out for Delivery', time: '11:00 AM', icon: Truck, completed: false },
  { status: 'Delivered', time: '11:30 AM', icon: CheckCircle, completed: false },
];

export default function OrderTrackingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-xl font-bold">Order Tracking</h1>
            </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col justify-between p-6">
        <div className="space-y-8">
            {timeline.map((step, index) => {
                const Icon = step.icon;
                const isLastStep = index === timeline.length - 1;
                return (
                    <div key={index} className="flex items-start gap-6">
                        <div className="flex flex-col items-center">
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center border-2",
                                step.completed ? "bg-primary border-primary" : "bg-background border-muted-foreground/30",
                                step.status === 'Out for Delivery' && 'bg-primary border-primary'
                            )}>
                                <Icon className={cn(
                                    "h-6 w-6",
                                    step.completed || step.status === 'Out for Delivery' ? "text-primary-foreground" : "text-muted-foreground/50"
                                )} />
                            </div>
                            {!isLastStep && (
                                <div className={cn(
                                    "w-0.5 flex-1",
                                    step.completed ? "bg-primary" : "bg-muted-foreground/30"
                                )} style={{ minHeight: '4rem' }}/>
                            )}
                        </div>
                        <div className="pt-1.5">
                            <h3 className="text-lg font-semibold">{step.status}</h3>
                            <p className="text-primary/80 font-medium">{step.time}</p>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">Estimated Delivery</h2>
            <p className="text-muted-foreground">11:30 AM - 12:00 PM</p>
        </div>
      </main>
    </div>
  );
}
