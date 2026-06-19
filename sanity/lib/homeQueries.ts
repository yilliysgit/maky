// sanity/lib/homeQueries.ts
import { groq } from "next-sanity"

export const homepageQuery = groq`
*[_type == "homepage"][0] {
  hero {
    disciplines[] {
      label,
      sub,
      image { alt, asset, hotspot }
    },
    stats { projects, years }
  },
  intro {
    heading, subtitle, title, paragraph1, paragraph2
  },
  cases {
    label,
    heading,
    items[]-> {
      _id,
      projectName,
      slug,
      featuredImage { asset, alt, hotspot },
      subcategory->{ title }
    }
  },
  process {
    label,
    heading,
    intro,
    steps[] { title, description },
    ctaTitle,
    ctaText
  },
cta {
  heading,
  subtext,
  trust,
  primaryLabel,
  primaryLink,    // 👈 VOEG DIT TOE
  secondaryLabel,
  secondaryLink   // 👈 VOEG DIT TOE
}
}
`