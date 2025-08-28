'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { useFavorites } from '@/contexts/favorites-context';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id, product.name);
  };
  
  const favorited = isFavorite(product.id);

  return (
    <Link href={`/product/${product.id}`} className="group">
        <Card className="flex flex-col h-full overflow-hidden transition-all group-hover:shadow-lg">
        <CardHeader className="p-0 relative">
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
            {product.discount && (
                <Badge variant="destructive" className="absolute top-2 left-2">
                    -{(product.discount * 100).toFixed(0)}%
                </Badge>
            )}
            <Button variant="outline" size="icon" onClick={handleFavoriteClick} aria-label="Add to favorites" className="absolute top-2 right-2 bg-background/70 hover:bg-background h-8 w-8">
                <Heart className={cn("h-4 w-4", favorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
            </Button>
        </CardHeader>
        <CardContent className="flex-grow p-4">
            <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
            <div className="flex justify-between items-center mt-2">
                <div>
                    <span className="font-bold text-lg">${(product.price * (1 - (product.discount || 0))).toFixed(2)}</span>
                    {product.discount && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                    )}
                </div>
                {product.rating && (
                     <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}</span>
                    </div>
                )}
            </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
        </CardFooter>
        </Card>
    </Link>
  );
}
