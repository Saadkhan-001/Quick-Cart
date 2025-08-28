import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Tag, Truck } from 'lucide-react';

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

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Notifications</h1>
      <div className="space-y-4">
        {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
                <Card key={notification.id}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                       <Icon className="h-6 w-6 text-primary" />
                        <CardTitle className="text-lg">{notification.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{notification.description}</p>
                        <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </CardContent>
                </Card>
            )
        })}
      </div>
    </div>
  );
}
