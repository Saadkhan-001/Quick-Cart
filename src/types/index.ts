export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  hint: string;
  rating?: number;
  discount?: number;
  size?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
