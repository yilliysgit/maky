// schemas/sections/imageTextSection.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "imageTextSection",
  title: "Afbeelding + tekst",
  type: "object",

  options: {
    collapsible: true,
    collapsed: false,
  },

  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Bijv. 'Werkwijze' of 'Over ons'",
    }),

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
    }),

    defineField({
      name: "bulletPoints",
      title: "Bulletpoints",
      type: "array",
      of: [{ type: "string" }],
      description: "Optionele lijst met punten onder de tekst",
    }),

    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "imagePosition",
      title: "Afbeelding positie",
      type: "string",
      options: {
        list: [
          { title: "Afbeelding links", value: "left" },
          { title: "Afbeelding rechts", value: "right" },
        ],
        layout: "radio",
      },
      initialValue: "right",
    }),

    defineField({
      name: "cta",
      title: "Knop",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Knoptekst",
          type: "string",
        }),
        defineField({
          name: "url",
          title: "URL",
          type: "string",
          description: "Bijv. /contact of /diensten/interieur/interieurfolies",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title: title || "Afbeelding + tekst",
        media,
      }
    },
  },
})