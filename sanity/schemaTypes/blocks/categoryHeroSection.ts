// client/sanity/schemaTypes/blocks/categoryHeroSection.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "categoryHeroSection",
  title: "Hero (35% Tekst / 65% Projectfoto)",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Bijv. 'GEVEL RECLAME'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline / Subtitel",
      type: "string",
      description: "Bijv. 'Opvallen begint bij de gevel.'",
    }),

    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
      description: "Korte tekst onder de tagline (max. ±200 tekens).",
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: "image",
      title: "Grote Projectfoto (65% breedte)",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst (SEO)",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Harde USP's / Statistieken",
      type: "array",
      description: "Voeg exact 3 statistieken toe voor direct bewijs onder de tekst.",
      validation: (Rule) => Rule.max(3),
      of: [
        {
          type: "object",
          name: "statItem",
          title: "Statistiek",
          fields: [
            { name: "value", type: "string", title: "Waarde (bijv. 120+ of Eigen)" },
            { name: 'label', type: 'string', title: 'Label (bijv. gerealiseerd of productie)' },
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      tagline: "tagline",
      media: "image",
    },
    prepare({ title, tagline, media }) {
      return {
        title: title ? `Hero · ${title}` : "Hero",
        subtitle: tagline || "Geen tagline ingevuld",
        media,
      };
    },
  },
});