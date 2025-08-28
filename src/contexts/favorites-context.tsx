'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Product } from '@/types';
import { useToast } from "@/hooks/use-toast"

interface FavoritesContextType {
  favoriteIds: Set<string>;
  toggleFavorite: (productId: string, productName: string) => void;
  isFavorite: (productId: string) => boolean;
  favorites: Product[];
  setFavorites: (products: Product[]) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem('favorite_products');
      if (storedFavorites) {
        setFavoriteIds(new Set(JSON.parse(storedFavorites)));
      }
    } catch (error) {
        console.error("Could not read favorites from localStorage", error);
    }
  }, []);

  const toggleFavorite = (productId: string, productName: string) => {
    setFavoriteIds(prevIds => {
      const newIds = new Set(prevIds);
      let isFavorited;
      if (newIds.has(productId)) {
        newIds.delete(productId);
        isFavorited = false;
      } else {
        newIds.add(productId);
        isFavorited = true;
      }
      try {
        localStorage.setItem('favorite_products', JSON.stringify(Array.from(newIds)));
      } catch (error) {
        console.error("Could not save favorites to localStorage", error);
      }
      
      toast({
        title: isFavorited ? "Added to favorites" : "Removed from favorites",
        description: `${productName} has been ${isFavorited ? 'added to' : 'removed from'} your favorites.`,
      });

      return newIds;
    });
  };

  const isFavorite = (productId: string) => {
    return favoriteIds.has(productId);
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite, favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
