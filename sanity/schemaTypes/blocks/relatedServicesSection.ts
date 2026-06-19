import { defineField, defineType } from "sanity";

export default defineType({
  name: "relatedServicesSection",
  title: "Gerelateerde diensten",
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
      initialValue: "Gerelateerde oplossingen",
    }),

    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "services",
      title: "Diensten",
      type: "array",
      of: [
        {
          type: "reference",
          // AANGEPAST: Verwijst nu naar 'subcategory' in plaats van 'subService'
          to: [{ type: "subcategory" }], 
        },
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare({ title }) {
      return {
        title: title || "Gerelateerde diensten",
        subtitle: "Related Services Section",
      };
    },
  },
});