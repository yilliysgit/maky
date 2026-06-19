import { defineType, defineField } from "sanity"

export default defineType({
  name: "subServiceSelectorSection",
  title: "Sub-Service Selector (Immersive)",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Kleine boven-titel",
      type: "string",
      initialValue: "Architectural Signage Portfolio",
    }),
    defineField({
      name: "title",
      title: "Grote titel",
      type: "string",
      initialValue: "Selecteer een structuurklasse om de technische blauwdrukken te openen.",
    }),
    defineField({
      name: "items",
      title: "Gekoppelde Sub-services",
      type: "array",
      description: "Sleep hier de sub-services naartoe die je in dit overzicht wilt tonen.",
      of: [{ type: "reference", to: [{ type: "subService" }] }],
    }),
  ],
})