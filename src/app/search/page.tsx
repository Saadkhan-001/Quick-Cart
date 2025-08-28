
'use client';

import { useState } from 'react';
import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';
import { Input } from '@/components/ui/input';
import { Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center">
            <div className="relative flex w-full items-center justify-center">
                 <Button variant="ghost" size="icon" className="absolute left-0" onClick={() => router.back()}>
                    <ArrowLeft />
                    <span className="sr-only">Back</span>
                </Button>
                <h1 className="text-xl font-bold">Search</h1>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
            <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for products" 
                    className="pl-12 h-14 rounded-full bg-muted/50 border-0 focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          <ProductGrid products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}
