import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Categorie",
  type: "document",

  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "settings", title: "Instellingen" },
  ],

  fieldsets: [
    {
      name: "basicInfo",
      title: "Basis info",
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Naam",
      type: "string",
      group: "content",
      fieldset: "basicInfo",
      validation: (Rule) => Rule.required().min(2),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      fieldset: "basicInfo",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      fieldset: "basicInfo",
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: "image",
      title: "Achtergrondafbeelding",
      description: "Gebruikt op de categorie pagina hero",
      type: "image",
      group: "content",
      fieldset: "basicInfo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),

    // ── NIEUW — homepage kaart afbeelding ─────────────────────
    defineField({
      name: "homepageImage",
      title: "Homepage afbeelding",
      description: "Afbeelding voor de kaart op de homepage (portrait, 4:5)",
      type: "image",
      group: "content",
      fieldset: "basicInfo",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt tekst",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),

    defineField({
      name: "description",
      title: "Beschrijving",
      type: "text",
      rows: 4,
      group: "content",
      fieldset: "basicInfo",
      validation: (Rule) => Rule.max(400),
    }),

    defineField({
      name: "sections",
      title: "Pagina-opbouw",
      type: "array",
      group: "content",
      description: "Bepaal welke secties zichtbaar zijn en in welke volgorde.",
      of: [
        { type: "categoryHeroSection" },
        { type: "categoryIntroSection" },
        { type: "featuredProjectsSection" },
        { type: "serviceListSection" },
        { type: "imageTextSection" },
        { type: "processSection" },
        { type: "uspSection" },
        { type: "faqSection" },
        { type: "ctaSection" },
      ],
    }),

    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      group: "settings",
      description: "Lagere nummers komen eerst (1, 2, 3...)",
      initialValue: 1,
      validation: (Rule) =>
        Rule.required()
          .integer()
          .min(1)
          .max(999)
          .custom(async (value, context) => {
            if (value === undefined || value === null) return true;
            const { getClient, document } = context;
            const client = getClient({ apiVersion: "2024-01-01" });
            const currentId = document?._id;
            if (!currentId) return true;
            const publishedId = currentId.replace(/^drafts\./, "");
            const draftId = `drafts.${publishedId}`;
            const count = await client.fetch<number>(
              `count(*[_type == "category" && order == $order && !(_id in [$draftId, $publishedId])])`,
              { order: value, draftId, publishedId }
            );
            return count > 0
              ? `Volgorde ${value} is al in gebruik door een andere categorie.`
              : true;
          }),
    }),

    defineField({
      name: "color",
      title: "Kleur (hex)",
      type: "string",
      group: "settings",
      description: "Bijv. #3B82F6",
      validation: (Rule) =>
        Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
          name: "hex",
        }).error("Gebruik een geldige hex kleur, bv. #3B82F6 of #FFF"),
    }),

    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({
          name: "metaTitle",
          title: "Meta title",
          type: "string",
          validation: (Rule) => Rule.max(60).warning("Idealiter maximaal 60 tekens"),
        }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160).warning("Idealiter maximaal 160 tekens"),
        }),
        defineField({
          name: "noIndex",
          title: "No index",
          type: "boolean",
          initialValue: false,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
      media: "homepageImage",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: title || "Onbenoemde categorie",
        subtitle: `${order ? `#${order} · ` : ""}${subtitle || ""}`.trim(),
        media,
      };
    },
  },
});