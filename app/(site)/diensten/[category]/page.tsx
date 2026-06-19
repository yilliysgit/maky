// app/(site)/diensten/[category]/page.tsx
import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { categoryBySlugQuery } from "@/sanity/lib/catQueries";

import { CategoryHero } from "@/components/categories/hero/CategoryHero";
import { CategoryIntroSection } from "@/components/categories/CategoryIntroSection";  // ← TOEVOEGEN
import { ImageTextOverlaySection } from "@/components/categories/ImageTextOverlaySection";
import { CategoryServiceListSection } from "@/components/categories/CategoryServiceListSection";
import { CategoryFeaturedProjectsSection } from "@/components/categories/CategoryFeaturedProjectsSection";
import CTASection from "@/components/categories/CTASection";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

// app/(site)/diensten/[category]/page.tsx

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const category = await client.fetch(categoryBySlugQuery, { slug });

  console.log(
  category.sections?.find(
    (s: any) => s._type === "categoryHeroSection"
  )
);

  return (
    <main className="bg-black text-white">
     {category.sections?.map((section: any, index: number) => {
    switch (section._type) {
      case "categoryHeroSection":
        return (
          <CategoryHero
            key={section._key ?? `hero-${index}`}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            // HIER DE FIX: Direct de gemapte variabelen gebruiken uit de query!
            imageUrl={section.imageUrl}
            imageAlt={section.imageAlt}
            color={category.color}
          />
        );

          case "categoryIntroSection":
            return (
              <CategoryIntroSection
                key={section._key ?? `intro-${index}`}
                title={section.title}
                text={section.text}
                color={category.color}  // ← category kleur
              />
            );

          case "imageTextSection":
            return (
              <ImageTextOverlaySection
                key={section._key ?? `overlay-${index}`}
                label={section.label}
                title={section.title}
                text={section.text}
                bulletPoints={section.bulletPoints}
                cta={section.cta}
                color={category.color}  // ← category kleur
              />
            );

          case "serviceListSection":
            return (
              <CategoryServiceListSection
                key={section._key ?? `services-${index}`}
                services={section.services}
                title={section.title}
                intro={section.intro}
                color={category.color}  // ← category kleur
                categorySlug={slug}
                subcategorySlug={null}
              />
            );

          case "featuredProjectsSection":
            return (
              <CategoryFeaturedProjectsSection
                key={section._key ?? `projects-${index}`}
                label={section.label}
                title={section.title}
                intro={section.intro}
                projects={section.projects}
                color={category.color}  // ← category kleur (indien nodig)
              />
            );

       case "ctaSection":
  return (
    <CTASection
      key={section._key ?? `cta-${index}`}
      data={{
        heading: section.title,
        subtext: section.text,
        trust: section.bullets,
        primaryLabel: section.buttonLabel,
        secondaryLabel: section.secondaryButtonLabel,
      }}
      color={category.color}  // ← category kleur uit Sanity
    />
  );

          default:
            return null;
        }
      })}
    </main>
  );
}