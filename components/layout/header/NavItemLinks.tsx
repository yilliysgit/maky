"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { NavigationItem } from "@/types/header.type";

interface NavItemLinksProps {
  item: NavigationItem;
  onClick?: () => void;
}

const clean = (p: string) =>
  (p.split(/[?#]/)[0] || "/").replace(/\/+$/, "") || "/";

const computeActive = (pathname: string, href: string) => {
  const path = clean(pathname);
  const to = clean(href);
  return to === "/" ? path === "/" : path === to || path.startsWith(to + "/");
};

export default function NavItemLinks({ item, onClick }: NavItemLinksProps) {
  const pathname = usePathname() || "/";
  const active = computeActive(pathname, item.href);

  return (
    <Link href={item.href} onClick={onClick}>
      <motion.div
        className="relative px-4 py-2 rounded-lg"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <span
          className={`text-sm font-semibold transition-colors duration-150 ${
            active
              ? "text-[#f7f704]"
              : "text-white/70 hover:text-[#f7f704]"
          }`}
        >
          {item.name}
        </span>

        {active && (
          <motion.div
            layoutId="activeNav"
            className="absolute inset-x-1 -bottom-0.5 h-px bg-[#f7f704]"
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </motion.div>
    </Link>
  );
}