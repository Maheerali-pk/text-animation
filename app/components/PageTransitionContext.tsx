"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface PageTransitionContextType {
  isTransitioning: boolean;
  isFadingIn: boolean;
  startTransition: () => void;
  completeTransition: () => void;
}

const PageTransitionContext = createContext<PageTransitionContextType | undefined>(undefined);

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
};

interface PageTransitionProviderProps {
  children: ReactNode;
}

export const PageTransitionProvider: React.FC<PageTransitionProviderProps> = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);

  const startTransition = () => {
    setIsTransitioning(true);
    setIsFadingIn(false);
  };

  const completeTransition = () => {
    setIsTransitioning(false);
    setIsFadingIn(true);
    // Reset fade-in state after animation completes
    setTimeout(() => {
      setIsFadingIn(false);
    }, 500);
  };

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, isFadingIn, startTransition, completeTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
};

