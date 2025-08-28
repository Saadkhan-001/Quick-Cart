'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/contexts/cart-context';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const suggestedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
            data-ai-hint={product.hint}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-3xl lg:text-4xl font-bold">{product.name}</h1>
          {product.size && (
            <p className="text-muted-foreground mt-2 text-lg">{product.size}</p>
          )}
           {product.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-muted-foreground">{product.rating.toFixed(1)}</span>
            </div>
          )}
          <p className="mt-4 text-gray-700">{product.description}</p>
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-3xl font-bold">${(product.price * (1 - (product.discount || 0))).toFixed(2)}</span>
            {product.discount && (
              <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="flex items-center gap-4 mt-6">
            <p>Quantity:</p>
            <div className="flex items-center gap-2 border rounded-md p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <Button size="lg" className="mt-auto w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2" /> Add to Cart
          </Button>
        </div>
      </div>
      <Separator className="my-12" />
      <div>
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {suggestedProducts.map(p => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
