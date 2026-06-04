// schemas/sections/processSection.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "processSection",
  title: "Proces",
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
      description: "Bijv. 'Werkwijze' of 'Hoe wij werken'",
    }),

    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Bijv. 'Van briefing tot montage'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Intro tekst",
      type: "text",
      rows: 3,
      description: "Korte uitleg boven de stappen",
    }),

    defineField({
      name: "steps",
      title: "Stappen",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: { title: "title" },
            prepare({ title }) {
              return { title: title || "Stap" }
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
              rows: 3,
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
      s0: "steps.0.title",
      s1: "steps.1.title",
      s2: "steps.2.title",
      s3: "steps.3.title",
      s4: "steps.4.title",
      s5: "steps.5.title",
      s6: "steps.6.title",
      s7: "steps.7.title",
    },
    prepare({ title, s0, s1, s2, s3, s4, s5, s6, s7 }) {
      const count = [s0, s1, s2, s3, s4, s5, s6, s7].filter(Boolean).length
      return {
        title: title || "Proces",
        subtitle: `${count} stap${count !== 1 ? 'pen' : ''}`,
      }
    },
  },
})