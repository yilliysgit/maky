// app/(site)/projecten/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

import ProjectHero from "@/components/projecten/project/ProjectHero";
import ProjectSnapshot from "@/components/projecten/project/ProjectSnapshot";
import ProjectChallenge from "@/components/projecten/project/ProjectChallenge";
import ProjectApproach from "@/components/projecten/project/ProjectApproach";
// import ProjectImpactImage from "@/components/projecten/project/ProjectResult"; 
import ProjectResult from "@/components/projecten/project/ProjectResult";
import ProjectInBeeld from "@/components/projecten/project/ProjectInBeeld";

const projectQuery = groq`
*[_type == "project" && slug.current == $slug][0] {
  _id,
  projectName,
  slug,
  heroImage { asset, alt, hotspot },
  heroTagline,
  location,
  projectDate,
  client { name, url },
  context,
  scope,
  projectImages[] { asset, alt, hotspot },
  processSteps,
  result,
  resultImage { asset, alt, hotspot },  // ← Nieuw veld
  resultQuote,                           // ← Nieuw veld
  ctaText,
  ctaButton,
  subcategory->{ title, slug }
}
`;




export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch(projectQuery, { slug });
  const projectImagesForBeeld = project.projectImages?.map((img: any, index: number) => {
  const imgUrl = img.asset?._ref
    ? urlFor(img).width(2000).quality(90).auto("format").url()
    : null;
  
  if (!imgUrl) return null;
  
  // Bepaal het type op basis van index of een specifiek veld
  let type: "full" | "half" | "detail" = "half";
  
  if (index === 0) type = "full";
  else if (index === 1 || index === 2) type = "half";
  else if (index === 3) type = "detail";
  else type = "half";
  
  return {
    type,
    url: imgUrl,
    alt: img.alt || `Project visual ${index + 1}`,
    caption: img.caption || undefined,
    subtitle: img.subtitle || undefined,
  };
}).filter(Boolean);


  if (!project) {
    notFound();
  }

  const heroUrl = project.heroImage?.asset?._ref
    ? urlFor(project.heroImage)
        .width(2400)
        .quality(95)
        .auto("format")
        .url()
    : null;

  return (
// In je project page:

<main className="bg-[#050505]">
  {/* Hero */}
  <ProjectHero
    title={project.projectName}
    imageUrl={heroUrl}
    tagline={project.heroTagline}
    category={project.subcategory?.title}
    location={project.location}
    year={project.projectDate ? new Date(project.projectDate).getFullYear().toString() : undefined}
  />

  {/* De Uitdaging */}
  <ProjectChallenge
    title={project.projectName}
    challenge={project.context || "Bob Wassalon wilde een opvallende en duurzame gevelconstructie die de zichtbaarheid vanaf de weg sterk zou vergroten."}
    challengeNumber="01"
  />


  {/* Onze Aanpak */}
  <ProjectApproach
    steps={[
      {
        number: "01",
        title: "Ontwerp",
        description: "Conceptontwikkeling en 3D-visualisaties die perfect aansluiten bij de merkidentiteit."
      },
      {
        number: "02",
        title: "Engineering",
        description: "Technische uitwerking en constructieberekeningen voor een duurzame oplossing."
      },
      {
        number: "03",
        title: "Productie",
        description: "High-end productie met premium materialen en afwerking."
      },
      {
        number: "04",
        title: "Montage",
        description: "Professionele installatie door gecertificeerde specialisten."
      }
    ]}
  />

<ProjectResult
  resultText={project.result || "Het resultaat is een opvallende en duurzame gevelconstructie..."}
  imageUrl={project.resultImage?.asset?._ref ? urlFor(project.resultImage).width(2400).quality(95).auto("format").url() : heroUrl}
  imageAlt={project.resultImage?.alt || "Project resultaat"}
  quote={project.resultQuote}
/>



<ProjectInBeeld images={projectImagesForBeeld || []} />
</main>
  );
}