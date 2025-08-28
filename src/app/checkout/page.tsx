
'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, updateQuantity } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const deliveryFee = cartTotal > 0 ? 5.00 : 0;
  const total = cartTotal + deliveryFee;

  const handleCheckout = () => {
    // This would typically navigate to a separate payment page
    toast({
      title: 'Redirecting to Payment',
      description: 'You are now being redirected to the payment page.',
    });
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-xl font-bold">Cart</h1>
            </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-8">
            {cartItems.length > 0 ? (
                 <div className="space-y-6">
                    {cartItems.map(item => (
                        <div key={item.product.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                                <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" data-ai-hint={item.product.hint}/>
                                </div>
                                <div>
                                <p className="font-semibold text-lg">{item.product.name}</p>
                                <p className="text-sm text-primary font-medium">${(item.product.price * (1 - (item.product.discount || 0))).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-secondary" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-secondary" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ): (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                    <p className="text-muted-foreground">Add some items to get started!</p>
                </div>
            )}
        </div>
      </main>

      {cartItems.length > 0 && (
         <footer className="sticky bottom-0 bg-background border-t p-4 md:pb-4">
            <div className="container mx-auto max-w-xl">
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Summary</h2>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-muted-foreground">Subtotal</p>
                            <p className="font-medium">${cartTotal.toFixed(2)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-muted-foreground">Delivery</p>
                            <p className="font-medium">${deliveryFee.toFixed(2)}</p>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-xl">
                            <p>Total</p>
                            <p>${total.toFixed(2)}</p>
                        </div>
                    </div>
                     <Button size="lg" className="w-full bg-primary text-primary-foreground h-14 rounded-full text-lg font-bold" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </div>
            </div>
         </footer>
      )}
    </div>
  );
}
