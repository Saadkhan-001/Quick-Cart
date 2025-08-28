'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AppStateContextType {
  hasSeenWelcome: boolean;
  setHasSeenWelcome: (value: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [hasSeenWelcome, setHasSeenWelcomeState] = useState(false);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem('has_seen_welcome');
      if (storedValue) {
        setHasSeenWelcomeState(JSON.parse(storedValue));
      }
    } catch (error) {
        console.error("Could not read from localStorage", error);
    }
  }, []);

  const setHasSeenWelcome = (value: boolean) => {
    try {
      localStorage.setItem('has_seen_welcome', JSON.stringify(value));
      setHasSeenWelcomeState(value);
    } catch (error) {
        console.error("Could not save to localStorage", error);
    }
  };

  return (
    <AppStateContext.Provider value={{ hasSeenWelcome, setHasSeenWelcome }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
