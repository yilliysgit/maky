// sanity/lib/catQueries.ts
import { groq } from "next-sanity";

/**
 * Voor /diensten overzicht (grid)
 */
export const categoriesQuery = groq`
*[_type == "category"] | order(order asc) {
  _id,
  title,
  slug,
  tagline,
  shortDescription,
  color,

  image {
    alt,
    asset->{
      url
    }
  },

  homepageImage {
    alt,
    asset->{
      url
    }
  }
}
`;



/**
 * Voor /diensten/[category] pagina
 */
export const categoryBySlugQuery = groq`
*[_type == "category" && slug.current == $slug][0] {
  title,
  tagline,
  description,
  color,

  image {
    alt,
    asset->{ url }
  },

  sections[] {
    _type,

    // ===== HERO =====
 _type == "categoryHeroSection" => {
      _type,
      title,
      // We mappen 'tagline' uit je schema naar 'subtitle' voor het component
      "subtitle": tagline,
      description,
      
      // HIER ZIT DE FIX: we pakken 'image' uit het schema en hernoemen het naar imageUrl
      "imageUrl": image.asset->url,
      "imageAlt": image.alt
    },
    

    // ===== INTRO =====
    _type == "categoryIntroSection" => {
      _type,
      title,
      text
    },

    // ===== DIENSTEN LIJST =====
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
    shortDescription,
    order,

    image {
      alt,
      asset->{
        url
      }
    }
  }
},


// ===== Category Featured projected =====
_type == "featuredProjectsSection" => {
  _type,
  label,
  title,
  intro,

  projects[]->{
    _id,
    projectName,
    slug,

    featuredImage {
      alt,
      asset->{
        url
      }
    }
  }
},



    // ===== AFBEELDING + TEKST =====
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

    // ===== PROCES =====
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

    // ===== USP'S =====
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

    // ===== FAQ =====
    _type == "faqSection" => {
      _type,
      title,
      intro,
      items[] {
        question,
        answer
      }
    },

    // ===== CTA =====
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
`;