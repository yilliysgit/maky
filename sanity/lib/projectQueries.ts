// sanity/lib/queries/projectsQueries.ts

import { groq } from "next-sanity";

export const projectQuery = groq`
{
  "project": *[_type == "project" && slug.current == $slug][0] {
    _id,
    projectName,
    "slug": slug.current,
    featuredImage {
      asset,
      alt,
      hotspot
    },
    heroImage {
      asset,
      alt,
      hotspot
    },
    heroTagline,
    location,
    projectDate,
    client {
      name,
      url
    },
    context,
    scope,
   projectImages[] {
  asset,
  alt,
  caption,
  subtitle,
  layout,
  hotspot
},
    processSteps,
    result,
    ctaText,
    ctaButton,
    subcategory->{
      title,
      slug
    }
  },

"allProjects": *[_type == "project" && defined(slug.current)]
| order(projectDate asc) {
  _id,
  projectName,
  "slug": slug.current,
  projectDate,

  featuredImage {
    asset,
    alt,
    hotspot
  }
}
}
`;