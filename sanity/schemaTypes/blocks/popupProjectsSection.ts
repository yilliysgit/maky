import { defineType, defineField } from "sanity"

export default defineType({
  name: "makyPopupPortfolio", // <-- HIER DE UNIEKE NAAM
  title: "Projecten Showcase (Pop-up)",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Kleine boven-titel (Label)",
      type: "string",
      initialValue: "Doosletters in de praktijk",
    }),
    defineField({
      name: "title",
      title: "Grote Sectie Titel",
      type: "string",
      initialValue: "REALISATIES & PORTFOLIO",
    }),
    defineField({
      name: "projects",
      title: "Geselecteerde Projecten (Kies er 3)",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }], 
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
})