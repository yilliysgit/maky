import { defineType, defineField } from "sanity"

export default defineType({
  name: "productStylesSection",
  title: "Uitvoeringen / Stijlen Grid",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Kleine boven-titel (Label)",
      type: "string",
      initialValue: "Uitvoeringen",
    }),
    defineField({
      name: "title",
      title: "Grote Sectie Titel",
      type: "string",
      initialValue: "KIES JOUW LICHTUITSTRALING OF STIJL",
    }),
    defineField({
      name: "styles",
      title: "Uitvoeringen (Items)",
      type: "array",
      of: [
        {
          type: "object",
          name: "styleItem",
          title: "Uitvoering",
          fields: [
            defineField({
              name: "num",
              title: "Nummering (bijv. 01)",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Naam van uitvoering",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Korte uitleg / USP",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "image",
              title: "Productfoto",
              type: "image",
              options: { hotspot: true },
            }),
          ],
        },
      ],
    }),
  ],
})