'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { productRecommendations } from '@/ai/flows/product-recommendations';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const shoppingHistory = [
    "Artisan Bread", "Greek Yogurt", "Almond Milk"
];

export function AIRecommendations() {
  const { cartItems } = useCart();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const currentCart = cartItems.map(item => item.product.name);
      const result = await productRecommendations({ shoppingHistory, currentCart });
      setRecommendations(result.recommendedProducts);
    } catch (e) {
      setError('Failed to get recommendations. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-16">
      <Card className="bg-primary/20 border-primary/30">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <Wand2 className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-xl">AI Product Recommendations</CardTitle>
                <CardDescription>
                  Let our AI suggest products you might like!
                </CardDescription>
              </div>
            </div>
            <Button onClick={handleGetRecommendations} disabled={isLoading} className="bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                'Get Suggestions'
              )}
            </Button>
          </div>
        </CardHeader>
        {(recommendations.length > 0 || error) && (
            <CardContent>
            {error && (
                <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            {recommendations.length > 0 && (
                <div>
                <h3 className="font-semibold mb-2">Here are some products for you:</h3>
                <ul className="list-disc list-inside space-y-1">
                    {recommendations.map((product, index) => (
                    <li key={index}>{product}</li>
                    ))}
                </ul>
                </div>
            )}
            </CardContent>
        )}
      </Card>
    </section>
  );
}
