'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

  return (
    <Link href={`/product/${product.id}`} className="group">
        <Card className="flex flex-col h-full overflow-hidden transition-all group-hover:shadow-lg bg-transparent border-0 shadow-none rounded-lg">
            <CardContent className="p-0">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        data-ai-hint={product.hint}
                    />
                </div>
                <p className="mt-4 text-base font-semibold text-foreground text-center">{product.name}</p>
            </CardContent>
        </Card>
    </Link>
  );
}
