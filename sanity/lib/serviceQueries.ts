// client/sanity/lib/serviceQueries.ts
import { groq } from "next-sanity"

/**
 * Voor /diensten/[category]/[subcategory]/[service] pagina
 */
export const serviceBySlugQuery = groq`
*[_type == "service" && slug.current == $slug && parentSubcategory->slug.current == $subcategorySlug][0] {
  title,
  shortDescription,

  image {
    alt,
    asset->{ url }
  },

  parentSubcategory->{
    slug,
    parentCategory->{
      slug,
      color
    }
  },

  sections[] {
    _type,

    _type == "categoryHeroSection" => {
      _type,
      title,
      subtitle,
      overlay,
      backgroundImage {
        alt,
        asset->{ url }
      }
    },

    _type == "categoryIntroSection" => {
      _type,
      title,
      text
    },

    _type == "imageTextSection" => {
      _type,
      label,
      title,
      text,
      bulletPoints,
      imagePosition,
      image {
        alt,
        "url": asset->url
      },
      cta {
        label,
        url
      }
    },

    _type == "processSection" => {
      _type,
      label,
      title,
      intro,
      steps[] {
        title,
        text
      }
    },

    _type == "uspSection" => {
      _type,
      label,
      title,
      intro,
      items[] {
        title,
        text
      }
    },

    _type == "faqSection" => {
      _type,
      title,
      intro,
      items[] {
        question,
        answer
      }
    },

    _type == "ctaSection" => {
      _type,
      title,
      text,
      buttonLabel,
      buttonLink,
      secondaryButtonLabel,
      secondaryButtonLink,
      bullets
    },
  }
}
`