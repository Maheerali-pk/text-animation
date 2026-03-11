import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useEffectEvent, useState } from "react";
import { usePageTransition } from "./PageTransitionContext";
import path from "path";
import classNames from "classnames";

interface NavbarProps {}

interface NavbarItem {
  id: string;
  title: string;
  href: string;
}
const selectionDot = "●";
const navbarItems: NavbarItem[] = [
  {
    id: "0",
    title: "Home",
    href: "/home",
  },
  {
    id: "1",
    title: "Team",
    href: "/team",
  },
  {
    id: "2",
    title: "Portfolio",
    href: "/portfolio",
  },

  {
    id: "3",
    title: "Collection",
    href: "/collection",
  },
];
const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { startTransition } = usePageTransition();
  const [selectedOnNavbar, setSelectedOnNavbar] = useState<string>("0");
  useEffect(() => {
    const item = navbarItems.find((item) => item.href === pathname);
    if (item) {
      setSelectedOnNavbar(item.id);
    }
  }, []);

  useEffect(() => {
    // Check if we're on /home and if navbar hasn't been animated yet
    // Only animate when coming from /welcome to /home for the first time
    if (typeof window !== "undefined") {
      if (pathname === "/home") {
        const hasAnimated = sessionStorage.getItem("navbarAnimated");
        if (!hasAnimated) {
          setShouldAnimate(true);
          sessionStorage.setItem("navbarAnimated", "true");
        } else {
          setShouldAnimate(false);
        }
      } else {
        setShouldAnimate(false);
      }
    }
  }, [pathname]);

  const handleNavigation = (item: NavbarItem) => {
    // Don't navigate if already on the same page
    setSelectedOnNavbar(item.id);
    if (pathname === item.href) {
      return;
    }
    setSelectedOnNavbar(item.id);

    // Start fade-out transition
    startTransition();

    // Navigate after fade-out completes (0.5s)
    setTimeout(() => {
      router.push(item.href);
    }, 500);
  };
  if (pathname === "/welcome") {
    return null;
  }
  return (
    <div className="flex flex-col gap-2 ml-3 mt-3">
      {navbarItems.map((item) => (
        <motion.div
          key={item.href}
          initial={true ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={true ? { duration: 0.5, delay: 1 } : { duration: 0 }}
        >
          <div
            onClick={() => handleNavigation(item)}
            className={classNames("cursor-pointer", {
              uppercase: item.id === selectedOnNavbar,
            })}
          >
            {item.id === selectedOnNavbar
              ? `${selectionDot} ${item.title}`
              : item.title}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Navbar;
