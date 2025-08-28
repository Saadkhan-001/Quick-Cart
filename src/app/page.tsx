import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-muted-foreground">Delivery to</p>
                <span className="font-semibold">123 Main St...</span>
            </div>
            <MapPin className="h-6 w-6 text-foreground" />
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for products" className="pl-12 h-14 rounded-full bg-muted/50 border-0 focus-visible:ring-primary" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 my-4">
        <div className="relative aspect-video md:aspect-[2/1] lg:aspect-[2.4/1] w-full rounded-2xl overflow-hidden">
            <Image 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop"
                alt="Fresh vegetables"
                fill
                className="object-cover"
                data-ai-hint="vegetables groceries"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 to-transparent flex flex-col justify-end items-start text-left p-6 md:p-8">
                <div>
                    <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tighter">THE NATURAL STORY</h2>
                    <p className="text-green-200 text-sm mt-2 max-w-md">FRESH VEGETABLES OF WORK</p>
                    <p className="text-white font-bold text-xl mt-4">$81.45</p>
                </div>
            </div>
        </div>
      </div>
      
      <div className="py-4">
        <div className="overflow-x-auto">
            <div className="flex space-x-6 px-4">
                <Button variant="ghost" className="text-foreground font-bold relative after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-primary after:rounded-full pb-2 h-auto">Fruits</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Vegetables</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Snacks</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Drinks</Button>
                <Button variant="ghost" className="text-muted-foreground pb-2 h-auto">Bakery</Button>
            </div>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <Separator className="my-4" />
      </div>

      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
