'use client';

import Image from 'next/image';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useFavorites } from '@/contexts/favorites-context';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(product.id, product.name);
  };
  
  const favorited = isFavorite(product.id);

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.hint}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        <CardDescription className="mt-1 h-10 text-sm overflow-hidden">{product.description}</CardDescription>
        <p className="mt-2 font-bold text-lg">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon" onClick={handleFavoriteClick} aria-label="Add to favorites">
                <Heart className={cn("h-5 w-5", favorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
