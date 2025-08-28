import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Fresh Groceries, Delivered Fast
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover a wide range of fresh products and get your favorites delivered to your door with Quick Cart.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
