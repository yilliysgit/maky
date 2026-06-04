// sanity/lib/subCatQueries.ts
import { groq } from "next-sanity"

/**
 * Voor /diensten/[category]/[subcategory] pagina
 */
export const subcategoryBySlugQuery = groq`
*[_type == "subcategory" && slug.current == $slug && parentCategory->slug.current == $categorySlug][0] {
  title,
  tagline,
  shortDescription,
  color,

  image {
    alt,
    asset->{ url }
  },

  parentCategory->{
    slug,
    color
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

    _type == "serviceListSection" => {
      _type,
      title,
      intro,
      services[]->{
        _id,
        _type,
        title,
        slug,
        tagline,
        shortDescription
      }
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