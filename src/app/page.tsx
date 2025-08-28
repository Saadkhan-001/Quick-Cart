import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground">Delivery to</p>
                <span className="font-semibold">123 Main St...</span>
            </div>
            <MapPin className="h-6 w-6 text-foreground" />
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for products" className="pl-12 h-14 rounded-full bg-input border-0 focus-visible:ring-primary" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 my-4">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
            <Image 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop"
                alt="Fresh vegetables"
                fill
                className="object-cover"
                data-ai-hint="vegetables groceries"
            />
            <div className="absolute inset-0 bg-green-800/50 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter">THE NATURAL STORY</h2>
                <p className="text-green-200 text-sm mt-2">FRESH VEGETABLES OF WORK</p>
                <p className="text-green-200 font-bold text-lg mt-1">$81.45</p>
            </div>
        </div>
      </div>
      
      <div className="py-4">
        <div className="overflow-x-auto">
            <div className="flex space-x-6 px-4">
                <Button variant="ghost" className="text-foreground font-bold relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary after:rounded-full">Fruits</Button>
                <Button variant="ghost" className="text-muted-foreground">Vegetables</Button>
                <Button variant="ghost" className="text-muted-foreground">Snacks</Button>
                <Button variant="ghost" className="text-muted-foreground">Drinks</Button>
                <Button variant="ghost" className="text-muted-foreground">Bakery</Button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
