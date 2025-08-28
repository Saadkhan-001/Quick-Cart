'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, ReceiptText, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/cart-context';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/checkout', label: 'Cart', icon: ShoppingCart },
  { href: '/orders', label: 'Orders', icon: ReceiptText },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  
  const showNav = !['/onboarding', '/login', '/profile/create'].includes(pathname);

  if (!showNav) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t md:hidden z-50">
      <div className="container mx-auto flex justify-around h-20 items-center">
        {navItems.map((item) => {
          const isActive = (item.href === '/' && pathname === item.href) || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon!;
          return (
            <Link href={item.href} key={item.href} className="flex flex-col items-center justify-center text-sm relative w-1/5">
                <Icon className={cn('h-6 w-6 mb-1', isActive ? 'text-foreground' : 'text-muted-foreground')} />
                <span className={cn('text-xs', isActive ? 'text-foreground font-bold' : 'text-muted-foreground')}>
                    {item.label}
                </span>
                 {isActive && item.label === 'Home' && <div className="absolute -top-2 h-1 w-8 bg-primary rounded-full" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
