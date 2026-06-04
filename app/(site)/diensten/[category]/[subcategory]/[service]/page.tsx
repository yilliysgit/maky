// app/(site)/diensten/[category]/[subcategory]/[service]/page.tsx

import { client } from "@/sanity/lib/client"
import { serviceBySlugQuery } from "@/sanity/lib/serviceQueries"

import { CategoryHero } from "@/components/categories/CategoryHero"
import { CategoryIntroSection } from "@/components/categories/CategoryIntroSection"
import { ImageTextSection } from "@/components/categories/ImageTextSection"
//import { ProcessSection } from "@/components/categories/ProcessSection"
import { UspSection } from "@/components/categories/UspSection"
import { FaqSection } from "@/components/categories/FaqSection"
//import { CtaSection } from "@/components/categories/CTASection"

type PageProps = {
  params: Promise<{
    category: string
    subcategory: string
    service: string
  }>
}

export default async function Page({ params }: PageProps) {
  const { category, subcategory, service } = await params

  const serviceData = await client.fetch(serviceBySlugQuery, {
    slug: service,
    subcategorySlug: subcategory,
  })

  if (!serviceData) {
    return <div>Service niet gevonden</div>
  }

  const color = serviceData.parentSubcategory?.parentCategory?.color

  const heroSection = serviceData.sections?.find(
    (s: any) => s._type === "categoryHeroSection"
  )

  const uspSection = serviceData.sections?.find(
    (s: any) => s._type === "uspSection"
  )

  const faqSection = serviceData.sections?.find(
    (s: any) => s._type === "faqSection"
  )

  const ctaSection = serviceData.sections?.find(
    (s: any) => s._type === "ctaSection"
  )

  return (
    <>
    <CategoryHero
  title={heroSection?.title ?? serviceData.title}
  subtitle={heroSection?.subtitle}
  imageUrl={heroSection?.backgroundImage?.asset?.url ?? serviceData.image?.asset?.url}
  imageAlt={heroSection?.backgroundImage?.alt ?? serviceData.image?.alt}
  // color={color}
/>

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

          default:
            return null
        }
      })}

      {/* USP + FAQ naast elkaar */}
      {(uspSection || faqSection) && (
        <section className="bg-gray-950 py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {uspSection && (
                <UspSection
                  label={uspSection.label}
                  title={uspSection.title}
                  intro={uspSection.intro}
                  items={uspSection.items}
                  color={color}
                />
              )}
              {faqSection && (
                <FaqSection
                  title={faqSection.title}
                  intro={faqSection.intro}
                  items={faqSection.items}
                  color={color}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}