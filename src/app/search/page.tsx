'use client';

import { ProductGrid } from '@/components/product-grid';
import { products } from '@/lib/products';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid products={products} />
    </div>
  );
}
