// schemas/sections/faqSection.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "faqSection",
  title: "FAQ",
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
  description: "Bijv. 'Veelgestelde vragen'",
}),

    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Bijv. 'Veelgestelde vragen'",
    }),

    defineField({
      name: "intro",
      title: "Intro tekst",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "items",
      title: "Vragen",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: { title: "question" },
            prepare({ title }) {
              return { title: title || "Vraag" }
            },
          },
          fields: [
            defineField({
              name: "question",
              title: "Vraag",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Antwoord",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    select: {
      title: "title",
      q0: "items.0.question",
      q1: "items.1.question",
      q2: "items.2.question",
      q3: "items.3.question",
      q4: "items.4.question",
    },
    prepare({ title, q0, q1, q2, q3, q4 }) {
      const count = [q0, q1, q2, q3, q4].filter(Boolean).length
      return {
        title: title || "FAQ",
        subtitle: `${count} vraag${count !== 1 ? 'en' : ''}`,
      }
    },
  },
})