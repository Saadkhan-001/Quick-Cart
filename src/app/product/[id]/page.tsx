
'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Star, Plus, Minus, ArrowLeft, Share2 } from 'lucide-react';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/contexts/cart-context';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ProductHeader } from '@/components/product-header';
import { Progress } from '@/components/ui/progress';

const ratingDistribution = [
  { star: 5, percentage: 40 },
  { star: 4, percentage: 30 },
  { star: 3, percentage: 15 },
  { star: 2, percentage: 5 },
  { star: 1, percentage: 10 },
];


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
    <div className="bg-background">
      <ProductHeader />
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover rounded-b-3xl"
          data-ai-hint={product.hint}
        />
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            {product.size && (
                <p className="text-muted-foreground mt-1 text-lg">{product.size}</p>
            )}
        </div>

        {product.rating && (
            <div className="flex gap-6 items-start">
                <div className="flex flex-col items-center">
                    <p className="text-4xl font-bold">{product.rating.toFixed(1)}</p>
                    <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'text-primary fill-primary' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">120 reviews</p>
                </div>
                <div className="flex-1 space-y-1">
                    {ratingDistribution.map(item => (
                        <div key={item.star} className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.star}</span>
                            <Progress value={item.percentage} className="h-2 bg-muted" />
                            <span className="text-sm text-muted-foreground w-8 text-right">{item.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        )}
        
        <Separator />

        <div className="flex justify-between items-center">
            <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">PKR{(product.price * (1 - (product.discount || 0))).toFixed(2)}</span>
                {product.discount && (
                <span className="text-lg text-muted-foreground line-through">PKR{product.price.toFixed(2)}</span>
                )}
            </div>

            <div className="flex items-center gap-4">
                <p className="text-muted-foreground">Quantity</p>
                <div className="flex items-center gap-2 border rounded-full p-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4" />
                </Button>
                </div>
            </div>
        </div>
        
        <Button size="lg" className="w-full bg-primary text-primary-foreground h-14 rounded-full text-lg font-bold" onClick={handleAddToCart}>
            Add to Cart
        </Button>
        
        <Separator />

        <div>
            <h2 className="text-2xl font-bold mb-4">You may also like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map(p => (
                <ProductCard product={p} key={p.id} />
            ))}
            </div>
        </div>
      </div>
    </div>
  );
}
