// components/projecten/project/ProjectNavigation.tsx

import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

type NavProject = {
  projectName: string;
  slug: string;
  featuredImage?: any;
};

type ProjectNavigationProps = {
  previousProject?: NavProject | null;
  nextProject?: NavProject | null;
};
export default function ProjectNavigation({
  previousProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <section className="grid min-h-[55vh] md:grid-cols-2">
      {previousProject ? (
        <Link
          href={`/projecten/${previousProject.slug}`}
          className="group relative overflow-hidden"
        >
          <img
            src={urlFor(previousProject.featuredImage)
              .width(1600)
              .quality(95)
              .url()}
            alt={previousProject.projectName}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/60 transition group-hover:bg-black/40" />

          <div className="relative z-10 flex h-full flex-col justify-end p-12">
            <span className="mb-4 text-sm uppercase text-white/60">
              Vorige case
            </span>

            <h2 className="text-5xl font-black uppercase text-white">
              {previousProject.projectName}
            </h2>
          </div>
        </Link>
      ) : (
        <div className="bg-black" />
      )}

      {nextProject ? (
        <Link
          href={`/projecten/${nextProject.slug}`}
          className="group relative overflow-hidden"
        >
          <img
            src={urlFor(nextProject.featuredImage)
              .width(1600)
              .quality(95)
              .url()}
            alt={nextProject.projectName}
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/60 transition group-hover:bg-black/40" />

          <div className="relative z-10 flex h-full flex-col items-end justify-end p-12 text-right">
            <span className="mb-4 text-sm uppercase text-white/60">
              Volgende case
            </span>

            <h2 className="text-5xl font-black uppercase text-white">
              {nextProject.projectName}
            </h2>
          </div>
        </Link>
      ) : (
        <div className="bg-black" />
      )}
    </section>
  );
}