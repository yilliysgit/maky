// app/(site)/projecten/page.tsx
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import ProjectenClient from "@/components/projecten/ProjectenClient"

const projectsQuery = groq`
*[_type == "project"] | order(projectDate desc) {
  _id,
  projectName,
  slug,
  heroTagline,
  featuredImage { asset, alt, hotspot },
  subcategory->{ title }
}
`

export default async function ProjectenPage() {
  const projects = await client.fetch(projectsQuery)
  return <ProjectenClient projects={projects} />
}