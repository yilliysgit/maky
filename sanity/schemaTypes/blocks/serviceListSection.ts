// schemas/sections/serviceListSection.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "serviceListSection",
  title: "Diensten overzicht",
  type: "object",

  options: {
    collapsible: true,
    collapsed: true,
  },

  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Bijv. 'Onze interieur oplossingen'",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Intro tekst",
      type: "text",
      rows: 3,
      description: "Korte uitleg boven de diensten",
    }),

defineField({
  name: "services",
  title: "Items",
  type: "array",
  of: [
    { type: "reference", name: "subcategoryRef", to: [{ type: "subcategory" }] },
    { type: "reference", name: "serviceRef", to: [{ type: "service" }] },
  ],
  validation: (Rule) => Rule.min(1),
}),
  ],

  preview: {
    select: {
      title: "title",
      s0: "services.0.title",
      s1: "services.1.title",
      s2: "services.2.title",
      s3: "services.3.title",
      s4: "services.4.title",
      s5: "services.5.title",
      s6: "services.6.title",
      s7: "services.7.title",
      s8: "services.8.title",
      s9: "services.9.title",
    },
    prepare({ title, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9 }) {
      const count = [s0, s1, s2, s3, s4, s5, s6, s7, s8, s9].filter(Boolean).length
      return {
        title: title || "Diensten overzicht",
        subtitle: `${count}${count === 10 ? '+' : ''} dienst${count !== 1 ? 'en' : ''}`,
      }
    },
  },

})