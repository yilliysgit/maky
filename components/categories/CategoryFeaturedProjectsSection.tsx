"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  _id: string;

  projectName: string;

  slug: {
    current: string;
  };

  featuredImage?: {
    alt?: string;
    asset?: {
      url: string;
    };
  };
};

type Props = {
  label?: string;
  title?: string;
  intro?: string;
  projects: Project[];
};

export function CategoryFeaturedProjectsSection({
  label,
  title,
  intro,
  projects,
}: Props) {
  if (!projects?.length) return null;

  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-[1800px] px-8 py-32 lg:px-16">

        {label && (
          <div className="mb-6 text-xs uppercase tracking-[0.35em] text-white/40">
            {label}
          </div>
        )}

        {title && (
          <h2 className="max-w-5xl text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
            {title}
          </h2>
        )}

        {intro && (
          <p className="mt-8 max-w-2xl text-lg text-white/60">
            {intro}
          </p>
        )}

        <div className="mt-20 space-y-24">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projecten/${project.slug.current}`}
              className="group block"
            >
              <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                <div>
                  <h3
                    className="
                      text-[clamp(3rem,5vw,6rem)]
                      font-semibold
                      leading-[0.9]
                      tracking-[-0.06em]

                      transition-transform
                      duration-500

                      group-hover:translate-x-4
                    "
                  >
{project.projectName}
                  </h3>
                </div>

                <div
                  className="
                    overflow-hidden
                    rounded-[32px]
                    bg-white/5
                  "
                >
                  {project.featuredImage?.asset?.url && (
                    <Image
                      src={project.featuredImage.asset.url}
                     alt={project.featuredImage?.alt ?? project.projectName}
                      width={1400}
                      height={900}
                      className="
                        h-full
                        w-full
                        object-cover

                        transition-transform
                        duration-700

                        group-hover:scale-105
                      "
                    />
                  )}
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}