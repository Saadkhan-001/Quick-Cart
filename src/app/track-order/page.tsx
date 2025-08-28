import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const timeline = [
  { status: 'Order Placed', icon: CheckCircle, completed: true },
  { status: 'Packed', icon: Package, completed: true },
  { status: 'Out for Delivery', icon: Truck, completed: true },
  { status: 'Delivered', icon: Home, completed: false },
];

export default function OrderTrackingPage() {
  const completedSteps = timeline.filter(step => step.completed).length;
  const progress = (completedSteps / (timeline.length -1)) * 100;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Track Order #ORD12345</CardTitle>
          <p className="text-muted-foreground">Estimated delivery: Today, 8:00 PM</p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center my-8">
            <Truck className="h-32 w-32 text-primary animate-pulse" />
          </div>
          <div className="relative w-full">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2">
                <div className="bg-primary h-1 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="relative flex justify-between">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex flex-col items-center z-10">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm mt-2 text-center">{step.status}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
