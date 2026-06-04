import { defineField, defineType } from "sanity";

export default defineType({
  name: "featuredProjectsSection",
  title: "Uitgelichte projecten",
  type: "object",

  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      initialValue: "Uitgelichte projecten",
    }),

    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),

    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "projects",
      title: "Projecten",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "project" }],
        },
      ],
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "Uitgelichte projecten",
      };
    },
  },
});