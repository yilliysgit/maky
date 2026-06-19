// app/(site)/diensten/[category]/[subcategory]/page.tsx

import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { subcategoryBySlugQuery } from "@/sanity/lib/subCatQueries";

import { SubCategoryHero } from "@/components/categories/hero/SubCategoryHero";
import { ImageTextSection } from "@/components/categories/ImageTextSection";
import UspSection from "@/components/categories/UspSection";
import { CategoryIntroSection } from "@/components/categories/CategoryIntroSection";
import { CategoryServiceListSection } from "@/components/categories/CategoryServiceListSection";
import ProcessSection from "@/components/categories/ProcessSection";
import { FaqSection } from "@/components/categories/FaqSection";
import CategoryRelatedServicesSection from "@/components/categories/CategoryRelatedServicesSection";
import CTASection from "@/components/categories/CTASection";


type Props = {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
};

export default async function SubCategoryPage({ params }: Props) {
  const { category, subcategory } = await params;

  const subcategoryData = await client.fetch(
    subcategoryBySlugQuery,
    {
      categorySlug: category,
      slug: subcategory,
    }
  );

  if (!subcategoryData) {
    notFound();
  }

  const heroSection = subcategoryData.sections?.find(
    (section: any) => section._type === "categoryHeroSection"
  );

  console.log("SUB HERO:", heroSection);

  const categoryColor =
    subcategoryData.parentCategory?.color ?? "#f7f704";
console.log(subcategoryData.sections);

  return (
    <main className="bg-black text-white">
      <SubCategoryHero
        title={heroSection?.title ?? subcategoryData.title}
        tagline={heroSection?.tagline ?? subcategoryData.tagline}
        description={
          heroSection?.description ??
          subcategoryData.shortDescription
        }
        imageUrl={
          heroSection?.image?.url ??
          subcategoryData.image?.asset?.url
        }
        imageAlt={
          heroSection?.image?.alt ??
          subcategoryData.image?.alt
        }
        color={categoryColor}
        stats={heroSection?.stats ?? []}
      />

      <div className="relative z-30 w-full bg-[#0a0a0a]">
        {subcategoryData.sections?.map(
          (section: any, index: number) => {
            if (section._type === "categoryHeroSection") {
              return null;
            }

            switch (section._type) {
              case "categoryIntroSection":
                return (
                  <CategoryIntroSection
                    key={index}
                    title={section.title}
                    text={section.text}
                    color={categoryColor}
                  />
                );


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
                    color={categoryColor}
                  />
                );


                case "uspSection":
  return (
    <UspSection
      key={index}
      label={section.label}
      title={section.title}
      intro={section.intro}
      items={section.items}
      color={categoryColor}
    />
  );

              case "serviceListSection":
                return (
                  <CategoryServiceListSection
                    key={index}
                    services={section.services}
                    title={section.title}
                    intro={section.intro}
                    color={categoryColor}
                    categorySlug={category}
                    subcategorySlug={subcategory}
                  />
                );

              case "processSection":
  return (
    <ProcessSection
      key={index}
      data={{
        label: section.label,
        heading: section.heading,
        intro: section.intro,
        steps: section.steps,
        ctaTitle: section.ctaTitle,
        ctaText: section.ctaText,
      }}
    />
  );

        
                case "faqSection":
  return (
    <FaqSection
      key={index}
      title={section.title}
      intro={section.intro}
      items={section.items}
      color={categoryColor}
    />
  );

              case "relatedServicesSection":
                
                return (
               <CategoryRelatedServicesSection
  key={index}
  label={section.label}
  title={section.title}
  intro={section.intro}
  services={section.services}
  categorySlug={category}
  //color={categoryColor}
/>
                );

       case "ctaSection":
                return (
                  <CTASection
                    key={index}
                    data={{
                      heading: section.title,
                      subtext: section.text,
                      trust: section.bullets,
                      primaryLabel: section.buttonLabel,
                      secondaryLabel:
                        section.secondaryButtonLabel,
                    }}
                    color={categoryColor}
                  />
                );


              default:
                return null;
            }
          }
        )}
      </div>
    </main>
  );
}