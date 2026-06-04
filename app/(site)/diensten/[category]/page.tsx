import { notFound } from "next/navigation";

import { client } from "@/sanity/lib/client";
import { categoryBySlugQuery } from "@/sanity/lib/catQueries";

import { CategoryHero } from "@/components/categories/CategoryHero";
import { ImageTextOverlaySection } from "@/components/categories/ImageTextOverlaySection";
import { CategoryServiceListSection } from "@/components/categories/CategoryServiceListSection";
import { CategoryFeaturedProjectsSection } from "@/components/categories/CategoryFeaturedProjectsSection";
import CTASection from "@/components/categories/CTASection";

type Props = {
  params: Promise<{
    category: string;
  }>;
};

export default async function CategoryPage({
  params,
}: Props) {
  const { category: slug } = await params;

  const category = await client.fetch(
    categoryBySlugQuery,
    { slug }
  );

  if (!category) {
    notFound();
  }

  return (
    <main className="bg-black text-white">
      {category.sections?.map(
        (section: any, index: number) => {
          switch (section._type) {

            case "categoryHeroSection":
              return (
                <CategoryHero
                  key={section._key ?? `hero-${index}`}
                  title={section.title}
                  subtitle={section.subtitle}
                  description={section.description}
                  imageUrl={section.backgroundImage?.asset?.url}
                  imageAlt={section.backgroundImage?.alt}
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
                  color={category.color}
                />
              );

            case "serviceListSection":
              return (
                <CategoryServiceListSection
                  key={section._key ?? `services-${index}`}
                  title={section.title}
                  intro={section.intro}
                  services={section.services}
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
    />
  );

            default:
              return null;
          }
        }
      )}
    </main>
  );
}