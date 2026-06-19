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

    _type == "subServiceSelectorSection" => {
      _type,
      label,
      title,
        "debugCount": count(items),

      items[]-> {
        "id": _id,
        num,
        title,
        "categorySlug": parentServices[0]->parentSubcategory->parentCategory->slug.current,
        previewProject,
        previewYear,
        description,
        "imageUrl": image.asset->url,
        advantages,
        materials,
        specifications,
        processSteps,
        layerSections[] {
          _type,
          title,
          text,
          label,
          bulletPoints,
          imagePosition,
          image {
            alt,
            "url": asset->url
          },
          // 1. UITVOERINGEN DATA
          styles[] {
            num,
            title,
            description,
            image {
              alt,
              "url": asset->url
            }
          },
          // 2. MATERIALEN DATA IN POP-UP
          materials[] {
            title,
            description,
            textureImage {
              alt,
              "url": asset->url
            }
          },
          // 3. PROJECTEN PORTFOLIO DATA
          projects[]-> {
            "title": projectName,
            "slug": slug.current,
            "imageUrl": featuredImage.asset->url,
            "client": client.name,
            "year": string::split(projectDate, "-")[0]
          },
          steps[] { title, text },
          items[] { title, text, question, answer },
          
          // ==========================================
          // 4. VERBETERDE CTA DATA VOOR IN DE POP-UP
          // ==========================================
          _type == "ctaSection" => {
            title,
            text,
            buttonLabel,
            buttonLink,
            secondaryButtonLabel,
            secondaryButtonLink,
            bullets
          },

          // ==========================================
          // 5. GERELATEERDE SUB-SERVICES DATA
          // ==========================================
          services[]-> {
            _id,
            title,
            shortDescription,
            slug { current },
            image {
              alt,
              asset->{ url }
            }
          }
          // ==========================================
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

    // JOUW HOOFDPAGINA PORTFOLIO DATA HIER INGEBOUWD 🎉
    _type == "makyPopupPortfolio" => {
      _type,
      label,
      title,
      projects[]-> {
        "title": projectName,
        "slug": slug.current,
        "imageUrl": featuredImage.asset->url,
        "client": client.name,
        "year": string::split(projectDate, "-")[0]
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