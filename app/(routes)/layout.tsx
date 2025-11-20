"use client";
import { usePageTransition } from "@/app/components/PageTransitionContext";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function RoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isTransitioning, isFadingIn, completeTransition } =
    usePageTransition();
  const pathname = usePathname();
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    // Reset initial mount flag after first render
    setIsInitialMount(false);
  }, []);

  useEffect(() => {
    // When pathname changes, trigger fade-in
    if (pathname !== prevPathname && !isInitialMount) {
      completeTransition();
      setPrevPathname(pathname);
    }
  }, [pathname, prevPathname, isInitialMount, completeTransition]);

  // Don't apply transition to welcome page
  const isWelcomePage = pathname === "/welcome";

  // Determine opacity based on transition state
  let opacity = 1;
  if (isTransitioning) {
    opacity = 0; // Fade out
  } else if (isFadingIn && !isWelcomePage) {
    opacity = 1; // Fade in (will animate from 0 to 1)
  }

  return (
    <>
      <div className="absolute top-0 left-0 z-10">
        <Navbar></Navbar>
      </div>
      <motion.div
        key={pathname}
        initial={
          isInitialMount || isWelcomePage ? { opacity: 1 } : { opacity: 0 }
        }
        animate={{ opacity }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
