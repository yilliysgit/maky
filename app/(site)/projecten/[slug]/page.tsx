// app/(site)/projecten/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";

import { projectQuery } from "@/sanity/lib/projectQueries";

import ProjectHero from "@/components/projecten/project/ProjectHero";
import ProjectChallenge from "@/components/projecten/project/ProjectChallenge";
import ProjectApproach from "@/components/projecten/project/ProjectApproach";
import ProjectResult from "@/components/projecten/project/ProjectResult";
import ProjectInBeeld from "@/components/projecten/project/ProjectInBeeld";
import ProjectNavigation from "@/components/projecten/project/ProjectNavigation";

import CTASection from "@/components/categories/CTASection";


export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await client.fetch(projectQuery, { slug });

  const project = data?.project;
  console.log("PROJECT IMAGES", project?.projectImages);
  const allProjects = data?.allProjects || [];

  if (!project) notFound();

  const currentIndex = allProjects.findIndex(
    (p: any) => p.slug === slug
  );

  const previousProject =
    currentIndex > 0
      ? allProjects[currentIndex - 1]
      : null;

  const nextProject =
    currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : null;

  console.log("CURRENT", project.projectName);
  console.log("PREVIOUS", previousProject?.projectName);
  console.log("NEXT", nextProject?.projectName);
  console.log("NEXT PROJECT", nextProject);

  const heroUrl = project.heroImage?.asset?._ref
    ? urlFor(project.heroImage)
        .width(2400)
        .quality(95)
        .auto("format")
        .url()
    : null;

  const resultImageUrl = project.resultImage?.asset?._ref
    ? urlFor(project.resultImage)
        .width(2400)
        .quality(95)
        .auto("format")
        .url()
    : heroUrl;


  return (
    <main className="bg-[#050505]">
      <ProjectHero
        title={project.projectName}
        imageUrl={heroUrl}
        tagline={project.heroTagline}
        category={project.subcategory?.title}
        location={project.location}
        year={
          project.projectDate
            ? new Date(project.projectDate)
                .getFullYear()
                .toString()
            : undefined
        }
      />

      <ProjectChallenge
        title={project.projectName}
        challenge={
          project.context ||
          "Bob Wassalon wilde een opvallende en duurzame gevelconstructie die de zichtbaarheid vanaf de weg sterk zou vergroten."
        }
        challengeNumber="01"
      />

      <ProjectApproach
        steps={[
          {
            number: "01",
            title: "Ontwerp",
            description:
              "Conceptontwikkeling en 3D-visualisaties die perfect aansluiten bij de merkidentiteit.",
          },
          {
            number: "02",
            title: "Engineering",
            description:
              "Technische uitwerking en constructieberekeningen voor een duurzame oplossing.",
          },
          {
            number: "03",
            title: "Productie",
            description:
              "High-end productie met premium materialen en afwerking.",
          },
          {
            number: "04",
            title: "Montage",
            description:
              "Professionele installatie door gecertificeerde specialisten.",
          },
        ]}
      />

      <ProjectResult
        resultText={
          project.result ||
          "Het resultaat is een opvallende en duurzame gevelconstructie."
        }
        imageUrl={resultImageUrl}
        imageAlt={
          project.resultImage?.alt || "Project resultaat"
        }
        quote={project.resultQuote}
      />

      

      <ProjectInBeeld
        images={project.projectImages || []}
      />

      <ProjectNavigation
  previousProject={previousProject}
  nextProject={nextProject}
/>

<CTASection
  data={{
    heading: "Heb je een vergelijkbaar project.",
    subtext:
      "Van ontwerp en engineering tot productie en montage. We denken graag mee over een oplossing die past bij jouw locatie, merk en doelstellingen.",
    primaryLabel: "Project bespreken",
    secondaryLabel: "Gratis advies",
  }}
/>

    
    </main>
  );
}