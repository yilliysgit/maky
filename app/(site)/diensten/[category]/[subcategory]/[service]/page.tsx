"use client"

import { useState, useEffect, use } from "react"
import { client } from "@/sanity/lib/client"
import { serviceBySlugQuery } from "@/sanity/lib/serviceQueries"

import { ServiceHero } from "@/components/categories/hero/ServiceHero"
import { CategoryIntroSection } from "@/components/categories/CategoryIntroSection"
import { ImageTextSection } from "@/components/categories/ImageTextSection"
import { PopupProjectsSection } from "@/components/categories/PopupProjectsSection" 

// Alle benodigde componenten netjes geïmporteerd:
import { SubServiceSelector } from "@/components/categories/SubServiceSelector" 
import ProcessSection from "@/components/categories/ProcessSection" 
import UspSection from "@/components/categories/UspSection"
import { FaqSection } from "@/components/categories/FaqSection"
import CTASection from "@/components/categories/CTASection" // <-- Toegevoegd!

type PageProps = {
  params: Promise<{
    category: string
    subcategory: string
    service: string
  }>
}

export default function Page({ params }: PageProps) {
  const { category, subcategory, service } = use(params)
  
  const [serviceData, setServiceData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const data = await client.fetch(serviceBySlugQuery, {
        slug: service,
        subcategorySlug: subcategory,
      })
      setServiceData(data)
      setLoading(false)
    }
    fetchData()
  }, [service, subcategory])

  if (loading) {
    return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Laden...</div>
  }

  if (!serviceData) {
    return <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">Service niet gevonden</div>
  }

  const color = serviceData.parentSubcategory?.parentCategory?.color

  const heroSection = serviceData.sections?.find(
    (s: any) => s._type === "categoryHeroSection"
  )

  return (
    <>
      <ServiceHero
        title={heroSection?.title ?? serviceData.title}
        subtitle={heroSection?.tagline}
        description={heroSection?.description}
        imageUrl={heroSection?.image?.url ?? serviceData.image?.asset?.url}
        imageAlt={heroSection?.image?.alt ?? serviceData.image?.alt}
        stats={heroSection?.stats}
      />

      {/* DE VOLLEDIG DYNAMISCHE PAGINABUILDER LOOP 🎉 */}
      {serviceData.sections?.map((section: any, index: number) => {
        switch (section._type) {
          case "categoryIntroSection":
            return (
              <CategoryIntroSection
                key={index}
                title={section.title}
                text={section.text}
                color={color}
              />
            )

          case "imageTextSection":
            return (
              <ImageTextSection
                key={index}
                label={section.label}
                title={section.title}
                text={section.text}
                bulletPoints={section.bulletPoints}
                imagePosition={section.imagePosition}
                image={section.image}
                cta={section.cta}
                color={color}
              />
            )

          case "subServiceSelectorSection":
            return (
              <SubServiceSelector
                key={index}
                label={section.label}
                title={section.title}
                items={section.items}
                color={color}
              />
            )

          case "processSection":
            return (
              <ProcessSection
                key={index}
                data={{
                  label: section.label,
                  heading: section.title, 
                  intro: section.intro,
                  steps: section.steps,
                  ctaTitle: section.ctaTitle,
                  ctaText: section.ctaText,
                }}
              />
            )

          case "makyPopupPortfolio":
            return (
              <div key={index} className="w-full bg-[#050505] py-12">
                <PopupProjectsSection
                  label={section.label || "Projecten"}
                  title={section.title || "Ons opgeleverde werk"}
                  projects={section.projects || []}
                  color={color} 
                />
              </div>
            )

          case "uspSection":
            return (
              <div key={index} className="bg-gray-950 py-20">
                <div className="max-w-4xl mx-auto px-6">
                  <UspSection
                    label={section.label}
                    title={section.title}
                    intro={section.intro}
                    items={section.items}
                    color={color}
                  />
                </div>
              </div>
            )

          // FAQ NU NETJES IN DE DYNAMISCHE LOOP ➔ VERSCHIJNT WAAR JIJ HEM SLEEPT!
          case "faqSection":
            return (
              <div key={index} className="bg-gray-950 py-20 border-t border-white/[0.04]">
                <div className="max-w-4xl mx-auto px-6">
                  <FaqSection
                    title={section.title}
                    intro={section.intro}
                    items={section.items}
                    color={color}
                  />
                </div>
              </div>
            )

          // CTA NU COMPLEET INGEBOUWD OP DE HOOFDPAGINA!
          case "ctaSection":
            return (
              <div key={index} className="w-full relative clear-both block">
                <CTASection 
                  data={{
                    heading: section.title,
                    subtext: section.text,
                    primaryLabel: section.buttonLabel,
                    secondaryLabel: section.secondaryButtonLabel,
                    trust: section.bullets || undefined,
                  }} 
                  color={color} 
                />
              </div>
            )

          default:
            return null
        }
      })}
    </>
  )
}