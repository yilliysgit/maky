// types/homepage.type.ts

export interface SanityImageAsset {
  _ref: string
  _type: "reference"
}

export interface SanityImage {
  alt?: string
  asset: SanityImageAsset
  hotspot?: { x: number; y: number; height: number; width: number }
}

// ── HERO ──────────────────────────────────────────────────────

export interface HeroDiscipline {
  label: string
  sub?: string
  image?: SanityImage | null
}

export interface HeroStats {
  projects: number
  years: number
}

export interface HomepageHero {
  disciplines: HeroDiscipline[]
  stats: HeroStats
}

// ── INTRO ─────────────────────────────────────────────────────

export interface HomepageIntro {
  heading?: string
  subtitle?: string
  title?: string
  paragraph1?: string
  paragraph2?: string
}

// ── CASES ─────────────────────────────────────────────────────

export interface HomepageProject {
  _id: string
  projectName: string
  slug: { current: string }
  featuredImage?: SanityImage | null
  subcategory?: { title: string } | null
}

export interface HomepageCases {
  label?: string
  heading?: string
  items?: HomepageProject[]
}

// ── PROCESS ───────────────────────────────────────────────────

export interface ProcessStep {
  title: string
  description: string
}

export interface HomepageProcess {
  label?: string
  heading?: string
  intro?: string
  steps?: ProcessStep[]
  ctaTitle?: string
  ctaText?: string
}

// ── ROOT ──────────────────────────────────────────────────────

export interface HomepageCTA {
  heading?: string
  subtext?: string
  trust?: string[]
  primaryLabel?: string
  secondaryLabel?: string
}

export interface HomepageData {
  hero: HomepageHero
  intro?: HomepageIntro
  cases?: HomepageCases | null
  process?: HomepageProcess | null
  cta?: HomepageCTA | null
}