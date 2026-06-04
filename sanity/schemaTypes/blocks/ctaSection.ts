// schemas/sections/ctaSection.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "ctaSection",
  title: "Call to Action",
  type: "object",

  options: {
    collapsible: true,
    collapsed: false,
  },

  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "text",
      title: "Tekst",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "buttonLabel",
      title: "Knoptekst",
      type: "string",
    }),

    defineField({
      name: "buttonLink",
      title: "Knop link",
      type: "string",
    }),

    defineField({
      name: "secondaryButtonLabel",
      title: "Secundaire knoptekst",
      type: "string",
      description: "Bijv. 'Bel ons direct'",
    }),

    defineField({
      name: "secondaryButtonLink",
      title: "Secundaire knop link",
      type: "string",
    }),

    defineField({
      name: "bullets",
      title: "Bullets",
      type: "array",
      of: [{ type: "string" }],
      description: "Max 3 korte punten, bijv. 'Vrijblijvend advies'",
      validation: (Rule) => Rule.max(3),
    }),
  ],

  preview: {
    select: { title: "title" },
    prepare({ title }) {
      return { title: title || "CTA" }
    },
  },
})