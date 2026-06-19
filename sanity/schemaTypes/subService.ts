import { defineType, defineField } from "sanity"

export default defineType({
  name: "subService",
  title: "Sub-service",
  type: "document",
  fields: [
    defineField({
      name: "parentServices",
      title: "Gekoppeld aan Hoofdservices (Parents)",
      description: "Selecteer aan welke hoofdservice(s) deze sub-service gekoppeld moet zijn. Je kunt er meerdere kiezen!",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "title",
      title: "Titel (voor de lijst)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "num",
      title: "Nummering (bijv. 01)",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Hoofdafbeelding (voor hover-kaart)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Korte introductie",
      type: "text",
      rows: 3,
    }),
   defineField({
  name: "layerSections",
  title: "Pop-up Inhoud (Paginabuilder)",
  type: "array",
  of: [
    { type: "categoryIntroSection" },
    { type: "imageTextSection" },
    { type: "productStylesSection" }, 
    { type: "processSection" },
    { type: "materialSamplesSection" }, 
    { type: "makyPopupPortfolio" }, // <-- VERANDERD NAAR DE UNIEKE NAAM
    { type: "uspSection" },
    { type: 'relatedServicesSection' },
    { type: "faqSection" },
    { type: "ctaSection" },
  ],
}),
  ],
})