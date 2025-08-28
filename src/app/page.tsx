import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6 mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>Deliver to: 123 Main St...</span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-10 h-12" />
        </div>
        <div className="p-4 bg-primary/10 rounded-lg text-center">
          <p className="font-bold text-primary-foreground">Free Delivery on First 3 Orders</p>
        </div>
        <div className="flex justify-around bg-secondary p-2 rounded-lg">
          <Button variant="ghost">Fruits</Button>
          <Button variant="ghost">Vegetables</Button>
          <Button variant="ghost">Snacks</Button>
          <Button variant="ghost">Drinks</Button>
          <Button variant="ghost">Bakery</Button>
        </div>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}
