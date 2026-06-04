// app/(site)/page.tsx
import { client } from "@/sanity/lib/client"
import { homepageQuery } from "@/sanity/lib/homeQueries"
import { categoriesQuery } from "@/sanity/lib/catQueries"
import HomeHero from "@/components/hero/HomeHero"
import IntroReveal from "@/components/categories/IntroReveal"
// import ServicesSection from "@/components/categories/ServicesSection"
import ServicesGrid from "@/components/diensten/ServicesGrid"
import CasesHorizontal from "@/components/categories/CasesHorizontal"
import ProcessSection from "@/components/categories/ProcessSection"
import CTASection from "@/components/categories/CTASection"
import type { HomepageData } from "@/types/homepage.type"

const FALLBACK_HERO = {
  disciplines: [
    { label: "Gevelreclame", sub: "Architecturale signing & lichtreclame", image: null },
    { label: "Interieur",    sub: "Merkbeleving voor kantoren & retail",    image: null },
    { label: "Wayfinding",   sub: "Routing & bewegwijzering",               image: null },
    { label: "Voertuigen",   sub: "Carwraps & voertuigreclame",             image: null },
    { label: "Events",       sub: "Tijdelijke signing & beursstands",       image: null },
  ],
  stats: { projects: 120, years: 12 },
}

export default async function HomePage() {
  const [data, categories] = await Promise.all([
    client.fetch<HomepageData | null>(homepageQuery),
    client.fetch(categoriesQuery),
  ])

  return (
    <>
      <HomeHero data={data?.hero ?? FALLBACK_HERO} />
      <IntroReveal data={data?.intro} />
      <ServicesGrid categories={categories ?? []} />
      <CasesHorizontal data={data?.cases} />
      <ProcessSection data={data?.process} />

<CTASection
  data={
    data?.cta
      ? {
          ...data.cta,
          trust: data.cta.trust ?? [],
        }
      : null
  }
/>
    </>
  )
}