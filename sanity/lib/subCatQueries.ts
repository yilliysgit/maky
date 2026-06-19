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
      tagline,
      description,
      image {
        alt,
        "url": asset->url
      },
      stats[] {
        value,
        label
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

_type == "materialSamplesSection" => {
      _type,
      title,
      label,
      materials[] {
        _key,
        title,
        description,
        textureImage {
          "url": asset->url,
          alt
        }
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

_type == "relatedServicesSection" => {
  _type,
  label,
  title,
  intro,
  // We halen de sub-services op en zetten de data direct goed klaar
  services[]->{
    "id": _id, // Handig voor onze interne pop-up switch!
    title,
    shortDescription,
    slug { current }, // Zorgt dat slug.current werkt
    image {
      alt,
      asset->{ url }
    }
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