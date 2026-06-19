"use client";

import Image from "next/image";
import Link from "next/link";

// We hernoemen het type naar Subcategory omdat dit de lading nu beter dekt
type SubcategoryReference = {
  _id?: string; // Optioneel gemaakt voor de veiligheid tijdens transities
  title: string;
  shortDescription?: string;
  slug?: {
    current: string;
  };
  image?: {
    alt?: string;
    asset?: {
      url: string;
    };
  };
};

type Props = {
  label?: string | null;
  title?: string | null;
  intro?: string | null;
  services?: SubcategoryReference[]; // Aangepast type
  categorySlug: string;
};

export default function CategoryRelatedServicesSection({
  label,
  title,
  intro,
  services,
  categorySlug,
}: Props) {
  
  if (!services?.length) return null;

  return (
    <section className="bg-black py-32 text-white">
      <div className="mx-auto max-w-[1800px] px-8 lg:px-16">

        {label && (
          <div className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            {label}
          </div>
        )}

        {title && (
          <h2 className="max-w-5xl text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
            {title}
          </h2>
        )}

        {intro && (
          <p className="mt-8 max-w-2xl text-lg text-white/60">
            {intro}
          </p>
        )}

        <div className="mt-24 space-y-32">
          {services.map((item, index) => {
            // 1. VOORKOM KEY WARNING: Gebruik _id, val terug op index + titel als backup
            const uniqueKey = item._id || `subcat-${index}-${item.title.toLowerCase().replace(/\s+/g, '-')}`;
            
            // 2. VOORKOM CRASHES: Controleer of de slug daadwerkelijk bestaat
            const currentSlug = item.slug?.current;
            if (!currentSlug) return null; // Sla dit item veilig over als de slug (nog) niet is ingevuld

            return (
              <Link
                key={uniqueKey}
                href={`/diensten/${categorySlug}/${currentSlug}`}
                className="group block"
              >
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                  <div>
                    <h3
                      className="
                        text-[clamp(3rem,5vw,6rem)]
                        font-semibold
                        leading-[0.9]
                        tracking-[-0.06em]
                        transition-transform
                        duration-500
                        group-hover:translate-x-4
                      "
                    >
                      {item.title}
                    </h3>

                    {item.shortDescription && (
                      <p className="mt-8 max-w-md text-white/50 text-lg leading-relaxed">
                        {item.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="overflow-hidden rounded-[32px] bg-white/5">
                    {item.image?.asset?.url && (
                      <Image
                        src={item.image.asset.url}
                        alt={item.image.alt ?? item.title}
                        width={1400}
                        height={900}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-700
                          group-hover:scale-105
                        "
                      />
                    )}
                  </div>

                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}