import { defineType, defineField } from "sanity"

export default defineType({
  name: "service",
  title: "Service",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Instellingen" },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Naam",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "shortDescription",
      title: "Korte beschrijving",
      type: "text",
      group: "content",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),

    defineField({
      name: "parentSubcategory",
      title: "Bovenliggende subcategorie",
      type: "reference",
      group: "content",
      to: [{ type: "subcategory" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt tekst", type: "string" }),
      ],
    }),

    defineField({
      name: "sections",
      title: "Pagina-opbouw",
      type: "array",
      group: "content",
      description: "Bepaal welke secties zichtbaar zijn en in welke volgorde.",
      of: [
        { type: "categoryHeroSection" },
        { type: "categoryIntroSection" },
        { type: "imageTextSection" },
        { type: "processSection" },
        { type: "uspSection" },
        { type: "faqSection" },
        { type: "ctaSection" },
      ],
    }),

    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      group: "settings",
      initialValue: 1,
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          validation: (Rule) => Rule.max(60).warning("Idealiter maximaal 60 tekens"),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160).warning("Idealiter maximaal 160 tekens"),
        }),
        defineField({
          name: "noIndex",
          title: "No index",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "shortDescription",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Onbenoemde service",
        subtitle: subtitle || "",
        media,
      }
    },
  },
})