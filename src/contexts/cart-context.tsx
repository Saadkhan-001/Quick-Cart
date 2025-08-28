
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { CartItem, Product } from '@/types';
import { useToast } from "@/hooks/use-toast"

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
        const storedCart = localStorage.getItem('cart_items');
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    } catch (error) {
        console.error("Could not read cart from localStorage", error);
    }
  }, []);

  const updateCartInStorage = (items: CartItem[]) => {
    try {
        localStorage.setItem('cart_items', JSON.stringify(items));
    } catch (error) {
        console.error("Could not save cart to localStorage", error);
    }
  }

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        newItems = [...prevItems, { product, quantity }];
      }
      updateCartInStorage(newItems);
      return newItems;
    });
    toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
        const newItems = prevItems.filter(item => item.product.id !== productId);
        updateCartInStorage(newItems);
        return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems => {
        const newItems = prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        );
        updateCartInStorage(newItems);
        return newItems;
      });
    }
  };

  const clearCart = () => {
    setCartItems([]);
    updateCartInStorage([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = item.product.price * (1 - (item.product.discount || 0));
    return total + price * item.quantity;
  }, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
