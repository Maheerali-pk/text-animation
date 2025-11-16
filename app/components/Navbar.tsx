import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface NavbarProps {}

interface NavbarItem {
  title: string;
  href: string;
}
const selectionDot = "●";
const navbarItems: NavbarItem[] = [
  {
    title: "HOME",
    href: "/home",
  },
  {
    title: "Team",
    href: "/team",
  },
  {
    title: "Portfolio",
    href: "/portfolio",
  },

  {
    title: "Collection",
    href: "/collection",
  },
];
const Navbar: React.FC<NavbarProps> = () => {
  const pathnmae = usePathname();
  return (
    <div className="flex flex-col gap-2 ml-3 mt-3">
      {navbarItems.map((item) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link href={item.href} key={item.href}>
            {pathnmae === item.href
              ? `${selectionDot} ${item.title}`
              : item.title}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Navbar;
