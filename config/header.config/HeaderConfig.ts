import type { HeaderConfig } from "@/types/header.type";

export function getHeaderConfig(pathname?: string): HeaderConfig {
  // default header (nu overal hetzelfde)
  const baseConfig: HeaderConfig = {
    logo: { src: "/assets/maky-logo-wit.svg", alt: "MAKY", href: "/" },
    navigation: [
      { id: "home", name: "Home", href: "/" },
      { id: "diensten", name: "Diensten", href: "/diensten" },
      { id: "projecten", name: "Projecten", href: "/projecten" },
      { id: "over-ons", name: "Over ons", href: "/over-ons" },
      { id: "contact", name: "Contact", href: "/contact" },
    ],
    cta: { text: "Offerte aanvragen", href: "/contact" },
    tagline: "Interior & Exterior Visual Signing",
  };

  // 🔮 future-ready (NU nog niet nodig)
  // if (pathname === "/") {
  //   return {
  //     ...baseConfig,
  //     cta: { text: "Bekijk projecten", href: "/cases" },
  //   };
  // }

  return baseConfig;
}