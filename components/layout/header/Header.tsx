"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import Navigation from "./Navigation";
import { getHeaderConfig } from "@/config/header.config/HeaderConfig";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.85, 0.98]);

  const headerConfig = getHeaderConfig(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backdropFilter: scrolled ? "blur(16px)" : "blur(0px)" }}
    >
      {/* Achtergrond: Gebruik inset-0 zodat hij altijd de hele header vult */}
      <motion.div
        className="absolute inset-0 bg-black border-b"
        style={{
          opacity: scrolled ? headerOpacity : 0.9,
          borderColor: scrolled
            ? "rgba(247,247,4,0.2)"
            : "rgba(255,255,255,0.05)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        {/* We gebruiken py-4 voor padding in plaats van een vaste h-28 */}
        <div className="flex items-center justify-between py-4">

          {/* Logo: iets kleiner gemaakt (h-[60px]) voor een subtielere look */}
          <Link href={headerConfig.logo.href} className="relative transition-transform hover:scale-105">
            <div className="relative w-[180px] h-[60px]">
              <Image
                src={headerConfig.logo.src}
                alt={headerConfig.logo.alt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop navigatie */}
          <div className="hidden lg:block">
            <Navigation items={headerConfig.navigation} />
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href={headerConfig.cta.href}
              className="px-6 py-2.5 rounded-full bg-[#f7f704] text-black font-bold text-sm hover:bg-[#f7f704]/90 transition-all hover:shadow-[0_0_15px_rgba(247,247,4,0.3)]"
            >
              {headerConfig.cta.text}
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button
              className="w-10 h-10 border border-white/10 rounded-lg text-white flex items-center justify-center bg-white/5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-black border-t border-white/10"
        >
          <div className="px-6 py-6 space-y-3">
            {headerConfig.navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}