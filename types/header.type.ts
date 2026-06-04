// client/types/header.type.ts

export interface Logo {
  src: string;
  alt: string;
  href: string;
}

export interface NavigationItem {
  id: string;
  name: string;
  href: string;
  active?: boolean;
}

export interface HeaderCta {
  text: string;
  href: string;
}

export interface HeaderConfig {
  logo: Logo;
  navigation: NavigationItem[];
  cta: HeaderCta;
  tagline?: string; // optioneel: onder logo of in hero
}