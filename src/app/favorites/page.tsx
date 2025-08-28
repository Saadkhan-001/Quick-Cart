'use client';

import { useEffect } from 'react';
import { useFavorites } from '@/contexts/favorites-context';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/product-card';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favoriteIds, favorites, setFavorites } = useFavorites();

  useEffect(() => {
    const favoriteProducts = products.filter(p => favoriteIds.has(p.id));
    setFavorites(favoriteProducts);
  }, [favoriteIds, setFavorites]);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-20 border-dashed border-2 rounded-lg">
          <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-6">Click the heart on any product to save it here.</p>
          <Button asChild>
            <Link href="/">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
