// client/sanity/schemaTypes/blocks/categoryHeroSection.ts

import { defineField, defineType } from "sanity";

export default defineType({
  name: "categoryHeroSection",
  title: "Hero",
  type: "object",

  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Subtitel",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 3,
      description: "Korte tekst onder de titel (max. ±200 tekens).",
      validation: (Rule) => Rule.max(300),
    }),

    defineField({
      name: "backgroundImage",
      title: "Achtergrondafbeelding",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),

    defineField({
      name: "overlay",
      title: "Overlay donker",
      type: "boolean",
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      description: "description",
      media: "backgroundImage",
    },
    prepare({ title, subtitle, description, media }) {
      const sub =
        subtitle?.trim() ||
        description?.trim() ||
        "";

      return {
        title: title ? `Hero · ${title}` : "Hero",
        subtitle: sub,
        media,
      };
    },
  },
});