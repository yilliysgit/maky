import { defineType, defineField } from "sanity";

export default defineType({
  name: "categoryIntroSection",
  title: "Intro (categorie)",
  type: "object",

  // ✅ standaard OPEN
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
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: `Intro: ${title}`,
      };
    },
  },
});