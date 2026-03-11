"use client";
import { PageTransitionProvider } from "./PageTransitionContext";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <PageTransitionProvider>{children}</PageTransitionProvider>;
}
