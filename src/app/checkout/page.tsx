
'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Home, Briefcase, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function CheckoutPage() {
  const { cartTotal } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const deliveryFee = cartTotal > 0 ? 5.00 : 0;
  const taxes = cartTotal > 0 ? cartTotal * 0.08 : 0; // Example 8% tax
  const total = cartTotal + deliveryFee + taxes;

  const handleConfirmAndPay = () => {
    toast({
      title: 'Order Confirmed!',
      description: 'Thank you for your purchase.',
    });
    router.push('/track-order');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-xl font-bold">Checkout</h1>
            </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8 space-y-8">
            {/* Delivery Address Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
                <RadioGroup defaultValue="home" className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="p-3 bg-secondary rounded-lg">
                            <Home className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="home" className="font-semibold text-base">Home</Label>
                            <p className="text-muted-foreground text-sm">123 Elm Street, Apt 4B, Anytown, USA</p>
                        </div>
                        <RadioGroupItem value="home" id="home" />
                    </div>
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                         <div className="p-3 bg-secondary rounded-lg">
                            <Briefcase className="h-6 w-6 text-secondary-foreground" />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="work" className="font-semibold text-base">Work</Label>
                            <p className="text-muted-foreground text-sm">456 Oak Avenue, Anytown, USA</p>
                        </div>
                        <RadioGroupItem value="work" id="work" />
                    </div>
                </RadioGroup>
                <button className="flex items-center gap-4 mt-4 p-4 w-full">
                    <div className="p-3 bg-secondary rounded-lg">
                        <Plus className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <span className="font-semibold">Add New Address</span>
                </button>
            </div>
            
            {/* Payment Method Section */}
            <div>
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                 <RadioGroup defaultValue="credit-card" className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="p-2 border rounded-md">
                            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.5 0H2.5C1.125 0 0 1.125 0 2.5V17.5C0 18.875 1.125 20 2.5 20H29.5C30.875 20 32 18.875 32 17.5V2.5C32 1.125 30.875 0 29.5 0Z" fill="#4C4C4C"/>
                                <path d="M32 6.25H0V5H32V6.25Z" fill="white"/>
                                <path d="M5.1875 13.125C5.1875 12.0625 4.3125 11.25 3.125 11.25H2.5V15H3.125C4.3125 15 5.1875 14.1875 5.1875 13.125ZM3.75 13.125C3.75 13.5625 3.5 13.75 3.125 13.75H3.125V12.5H3.125C3.5 12.5 3.75 12.6875 3.75 13.125ZM8.75 15H9.375L7.6875 11.25H6.8125L5.125 15H5.75L6.1875 13.9375H8.3125L8.75 15ZM7.25 12.125L8.0625 13.3125H6.4375L7.25 12.125ZM12.1875 11.25H10.625V15H12.1875C13.5625 15 14.375 14.1875 14.375 13.125C14.375 12.0625 13.5625 11.25 12.1875 11.25ZM12.1875 13.75H11.25V12.5H12.1875C12.875 12.5 13.125 12.6875 13.125 13.125C13.125 13.5625 12.875 13.75 12.1875 13.75ZM15.625 11.25H15V15H15.625V11.25Z" fill="white"/>
                            </svg>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="credit-card" className="font-semibold text-base">Credit Card</Label>
                        </div>
                        <RadioGroupItem value="credit-card" id="credit-card" />
                    </div>
                     <div className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="p-2 border rounded-md">
                           <svg width="32" height="20" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg"><path d="M35.16 4.665c-1.47-2.83-4.2-4.665-7.44-4.665h-15.6c-3.36 0-6.15 1.92-7.35 4.845l11.04 19.155h8.4l5.91-19.335z" fill="#003087"></path><path d="M35.16 4.665c-1.47-2.83-4.2-4.665-7.44-4.665h-15.6c-3.36 0-6.15 1.92-7.35 4.845.87-1.725 2.865-3.03 5.175-3.03h15.6c2.625 0 4.935 1.5 6.075 3.735l-5.16 17.505c.6-.96.9-2.07.9-3.21 0-2.4-1.29-4.545-3.225-5.655l4.305-14.15z" fill="#009cde"></path><path d="M12.915 24l-3.36-5.82-3.33 5.82h-5.7l11.04-19.155c1.2-2.925 3.99-4.845 7.35-4.845h3.15l-19.155 24z" fill="#002f86"></path></svg>
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="paypal" className="font-semibold text-base">PayPal</Label>
                        </div>
                        <RadioGroupItem value="paypal" id="paypal" />
                    </div>
                </RadioGroup>
                <button className="flex items-center gap-4 mt-4 p-4 w-full">
                     <div className="p-3 bg-secondary rounded-lg">
                        <Plus className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <span className="font-semibold">Add New Payment Method</span>
                </button>
            </div>
        </div>
      </main>

       <footer className="sticky bottom-0 bg-background border-t p-4 md:pb-4">
            <div className="container mx-auto max-w-xl">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p className="font-medium text-foreground">PKR{cartTotal.toFixed(2)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p>Delivery Fee</p>
                            <p className="font-medium text-foreground">PKR{deliveryFee.toFixed(2)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p>Taxes</p>
                            <p className="font-medium text-foreground">PKR{taxes.toFixed(2)}</p>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-xl text-foreground">
                            <p>Total</p>
                            <p>PKR{total.toFixed(2)}</p>
                        </div>
                    </div>
                     <Button size="lg" className="w-full bg-primary text-primary-foreground h-14 rounded-full text-lg font-bold" onClick={handleConfirmAndPay}>
                        Confirm & Pay
                    </Button>
                </div>
            </div>
       </footer>
    </div>
  );
}

    