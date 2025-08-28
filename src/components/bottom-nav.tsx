'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, Package, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';
import { Badge } from './ui/badge';
import { CartSheet } from './cart-sheet';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { isCart: true, label: 'Cart', icon: null }, // Placeholder for CartSheet
  { href: '/orders', label: 'Orders', icon: Package },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  
  // Don't show on these pages
  if (['/welcome', '/onboarding', '/login'].includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t md:hidden">
      <div className="container mx-auto flex justify-around h-16 items-center">
        {navItems.map((item, index) => {
          if (item.isCart) {
            return (
              <div key="cart" className="flex flex-col items-center justify-center text-sm relative">
                <CartSheet />
                 <span className={cn('text-xs mt-1 text-muted-foreground')}>
                    {item.label}
                </span>
              </div>
            );
          }

          const isActive = (item.href === '/' && pathname === item.href) || (item.href !== '/' && pathname.startsWith(item.href!));
          const Icon = item.icon!;
          return (
            <Link href={item.href!} key={item.href} className="flex flex-col items-center justify-center text-sm relative">
                <Icon className={cn('h-6 w-6', isActive ? 'text-primary' : 'text-muted-foreground')} />
                <span className={cn('text-xs mt-1', isActive ? 'text-primary font-semibold' : 'text-muted-foreground')}>
                    {item.label}
                </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
