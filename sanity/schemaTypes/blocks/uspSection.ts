// schemas/sections/uspSection.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "uspSection",
  title: "USP's / Waarom wij",
  type: "object",

  options: {
    collapsible: true,
    collapsed: true,
  },

  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Bijv. 'Waarom MAKY'",
    }),

    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Bijv. 'Waarom kiezen voor ons?'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Intro tekst",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "items",
      title: "USP's",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title || "USP" }
            },
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
              title: "Omschrijving",
              type: "text",
              rows: 2,
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(2).max(8),
    }),
  ],

  preview: {
    select: {
      title: "title",
      u0: "items.0.title",
      u1: "items.1.title",
      u2: "items.2.title",
      u3: "items.3.title",
      u4: "items.4.title",
      u5: "items.5.title",
      u6: "items.6.title",
      u7: "items.7.title",
    },
    prepare({ title, u0, u1, u2, u3, u4, u5, u6, u7 }) {
      const count = [u0, u1, u2, u3, u4, u5, u6, u7].filter(Boolean).length
      return {
        title: title || "USP's",
        subtitle: `${count} USP${count !== 1 ? "'s" : ""}`,
      }
    },
  },
})