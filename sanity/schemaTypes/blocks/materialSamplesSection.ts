import { defineType, defineField } from "sanity"

export default defineType({
  name: "materialSamplesSection",
  title: "Materiaal Samples Grid",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Kleine boven-titel (Label)",
      type: "string",
      initialValue: "Vakmanschap & Grondstoffen",
    }),
    defineField({
      name: "title",
      title: "Grote Sectie Titel",
      type: "string",
      initialValue: "HOOGWAARDIGE MATERIALEN EN HOOGGLANS AFWERKING",
    }),
    defineField({
      name: "materials",
      title: "Materialen (Max 4 aanbevolen)",
      type: "array",
      of: [
        {
          type: "object",
          name: "materialItem",
          title: "Materiaal",
          fields: [
            defineField({
              name: "title",
              title: "Materiaal Naam (bijv. ALUMINIUM)",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Korte high-end omschrijving",
              type: "string",
            }),
            defineField({
              name: "textureImage",
              title: "Textuur / Sample foto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
})