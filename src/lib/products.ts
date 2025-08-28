import type { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'A bunch of fresh, organic bananas.',
    price: 1.99,
    imageUrl: 'https://picsum.photos/400/301',
    category: 'Fruits',
    hint: 'bananas fruit',
    rating: 4.5,
    discount: 0.1,
    size: '1 bunch'
  },
  {
    id: '2',
    name: 'Whole Milk',
    description: 'A gallon of fresh whole milk.',
    price: 3.49,
    imageUrl: 'https://picsum.photos/400/302',
    category: 'Dairy',
    hint: 'milk carton',
    rating: 4.8,
    size: '1 gallon'
  },
  {
    id: '3',
    name: 'Artisan Bread',
    description: 'A loaf of freshly baked artisan bread.',
    price: 4.99,
    imageUrl: 'https://picsum.photos/400/303',
    category: 'Bakery',
    hint: 'bread loaf',
    rating: 4.7,
    size: '1 loaf'
  },
  {
    id: '4',
    name: 'Free-Range Eggs',
    description: 'A dozen large free-range eggs.',
    price: 4.29,
    imageUrl: 'https://picsum.photos/400/304',
    category: 'Dairy',
    hint: 'eggs carton',
    rating: 4.9,
    size: '1 dozen'
  },
  {
    id: '5',
    name: 'Avocado',
    description: 'A ripe and creamy avocado.',
    price: 1.5,
    imageUrl: 'https://picsum.photos/400/305',
    category: 'Fruits',
    hint: 'avocado fruit',
    rating: 4.6,
    discount: 0.05,
    size: '1 pc'
  },
  {
    id: '6',
    name: 'Cherry Tomatoes',
    description: 'A pint of sweet cherry tomatoes.',
    price: 2.99,
    imageUrl: 'https://picsum.photos/400/306',
    category: 'Vegetables',
    hint: 'tomatoes vegetable',
    rating: 4.4,
    size: '1 pint'
  },
  {
    id: '7',
    name: 'Chicken Breast',
    description: 'Lean and tender chicken breast.',
    price: 9.99,
    imageUrl: 'https://picsum.photos/400/307',
    category: 'Meat',
    hint: 'chicken meat',
    rating: 4.8,
    size: '1 lb'
  },
  {
    id: '8',
    name: 'Spinach',
    description: 'A bag of fresh baby spinach.',
    price: 3.29,
    imageUrl: 'https://picsum.photos/400/308',
    category: 'Vegetables',
    hint: 'spinach leaves',
    rating: 4.7,
    size: '1 bag'
  },
  {
    id: '9',
    name: 'Potato Chips',
    description: 'A bag of classic potato chips.',
    price: 2.49,
    imageUrl: 'https://picsum.photos/400/309',
    category: 'Snacks',
    hint: 'potato chips',
    rating: 4.2,
    size: '8 oz'
  },
  {
    id: '10',
    name: 'Cola',
    description: 'A 12-pack of refreshing cola.',
    price: 6.99,
    imageUrl: 'https://picsum.photos/400/310',
    category: 'Drinks',
    hint: 'cola cans',
    rating: 4.9,
    size: '12-pack'
  }
];
