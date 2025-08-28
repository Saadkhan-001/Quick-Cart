'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from './ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export function CartSheet() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const isMobile = useIsMobile();

  const trigger = isMobile ? (
    <SheetTrigger asChild>
      <div className="relative">
        <ShoppingCart className={cn('h-6 w-6', 'text-muted-foreground')} />
        {cartCount > 0 && (
          <Badge variant="destructive" className="absolute -right-2 -top-1 h-5 w-5 justify-center p-0 rounded-full">{cartCount}</Badge>
        )}
      </div>
    </SheetTrigger>
  ) : (
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0 rounded-full">{cartCount}</Badge>
        )}
        <span className="sr-only">Open Cart</span>
      </Button>
    </SheetTrigger>
  );


  return (
    <Sheet>
      {trigger}
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({cartCount})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
                <div className="px-6 flex flex-col gap-4 py-4">
                {cartItems.map(item => (
                <div key={item.product.id} className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-md">
                        <Image
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            data-ai-hint={item.product.hint}
                        />
                    </div>
                    <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center gap-2">
                        <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                        <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                        <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground"
                        onClick={() => removeFromCart(item.product.id)}
                        >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                </div>
                ))}
                </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="px-6 py-4 bg-secondary/50">
                <div className="w-full">
                    <div className="flex justify-between font-semibold text-lg mb-4">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <SheetClose asChild>
                        <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                           <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                    </SheetClose>
                </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some products to get started!</p>
            <SheetClose asChild>
                <Button variant="outline" asChild>
                    <Link href="/">Continue Shopping</Link>
                </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
