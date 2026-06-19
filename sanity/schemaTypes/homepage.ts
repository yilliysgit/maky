// sanity/schemaTypes/homepage.ts
import { defineType, defineField } from "sanity"

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",

  groups: [
    { name: "hero",     title: "🎬 Hero",       default: true },
    { name: "intro",    title: "📝 Intro"                    },
    { name: "services", title: "🛠️ Diensten"                 },
    { name: "cases",    title: "📁 Projecten"                },
    { name: "process",  title: "⚙️ Werkwijze"                },
    { name: "cta",      title: "🚀 CTA"                      },
  ],

  fields: [

    // ═══════════════════════════════════════════════════════
    // 🎬 HERO
    // ═══════════════════════════════════════════════════════

    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: false },
      fields: [

        defineField({
          name: "disciplines",
          title: "Disciplines",
          description: "5 disciplines — elk met label, subtitel en afbeelding",
          type: "array",
          validation: (Rule) => Rule.min(1).max(5),
          of: [
            {
              type: "object",
              title: "Discipline",
              preview: {
                select: { title: "label", media: "image" },
              },
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  description: "bijv. Gevelreclame",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "sub",
                  title: "Subtitel",
                  type: "string",
                  description: "bijv. Architecturale signing & lichtreclame",
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
                  validation: (Rule) => Rule.required(),
                }),
              ],
            },
          ],
        }),

        defineField({
          name: "stats",
          title: "Stats",
          type: "object",
          options: { collapsible: true, collapsed: false },
          fields: [
            defineField({
              name: "projects",
              title: "Aantal projecten",
              type: "number",
              initialValue: 120,
            }),
            defineField({
              name: "years",
              title: "Jaren ervaring",
              type: "number",
              initialValue: 12,
            }),
          ],
        }),

      ],
    }),

    // ═══════════════════════════════════════════════════════
    // 📝 INTRO
    // ═══════════════════════════════════════════════════════

    defineField({
      name: "intro",
      title: "Intro sectie",
      type: "object",
      group: "intro",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "heading",
          title: "Grote heading",
          type: "string",
          description: "De grote scrub-tekst bovenaan",
          initialValue: "De sterkste merken herken je direct.",
        }),
        defineField({
          name: "subtitle",
          title: "Label links",
          type: "string",
          initialValue: "MAKY — Visual Signing",
        }),
        defineField({
          name: "title",
          title: "Titel rechts",
          type: "string",
          initialValue: "MAKY: specialist in visual signing voor binnen en buiten",
        }),
        defineField({
          name: "paragraph1",
          title: "Eerste alinea",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "paragraph2",
          title: "Tweede alinea",
          type: "text",
          rows: 3,
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════
    // 🛠️ DIENSTEN
    // ═══════════════════════════════════════════════════════

    defineField({
      name: "services",
      title: "Diensten sectie",
      type: "object",
      group: "services",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Onze disciplines",
        }),
        defineField({
          name: "items",
          title: "Diensten",
          description: "Koppel bestaande diensten aan de homepage",
          type: "array",
          of: [{ type: "reference", to: [{ type: "service" }] }],
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════
    // 📁 PROJECTEN
    // ═══════════════════════════════════════════════════════

    defineField({
      name: "cases",
      title: "Projecten sectie",
      type: "object",
      group: "cases",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Geselecteerd werk",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Projecten die ruimtes zichtbaar maken.",
        }),
        defineField({
          name: "items",
          title: "Projecten",
          description: "Selecteer projecten om te tonen",
          type: "array",
          validation: (Rule) => Rule.max(4),
          of: [{ type: "reference", to: [{ type: "project" }] }],
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════
    // ⚙️ WERKWIJZE
    // ═══════════════════════════════════════════════════════

    defineField({
      name: "process",
      title: "Werkwijze sectie",
      type: "object",
      group: "process",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Onze werkwijze",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Van eerste idee tot volledige realisatie.",
        }),
        defineField({
          name: "intro",
          title: "Intro tekst",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "steps",
          title: "Stappen",
          type: "array",
          of: [
            {
              type: "object",
              title: "Stap",
              preview: {
                select: { title: "title" },
              },
              fields: [
                defineField({ name: "title",       title: "Titel",       type: "string" }),
                defineField({ name: "description", title: "Beschrijving", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
        defineField({
          name: "ctaTitle",
          title: "CTA titel",
          type: "string",
          initialValue: "Heldere communicatie van begin tot eind.",
        }),
        defineField({
          name: "ctaText",
          title: "CTA tekst",
          type: "text",
          rows: 2,
        }),
      ],
    }),

    // ═══════════════════════════════════════════════════════
    // 🚀 CTA
    // ═══════════════════════════════════════════════════════


    defineField({
      name: "cta",
      title: "CTA sectie",
      type: "object",
      group: "cta",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Klaar om je merk zichtbaar te maken.",
        }),
        defineField({
          name: "subtext",
          title: "Subtekst",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "trust",
          title: "Trust badges",
          type: "array",
          of: [{ type: "string" }],
          initialValue: ["Vaste prijsafspraken", "Eigen productie", "12 jaar ervaring"],
        }),
        defineField({
          name: "primaryLabel",
          title: "Primaire knop tekst",
          type: "string",
          initialValue: "Project starten",
        }),
        // 👇 DIE MOET HIERBIJ:
        defineField({
          name: "primaryLink",
          title: "Primaire knop link",
          type: "string",
          description: "Bijv. /contact of een volledige URL",
          initialValue: "/contact",
        }),
        defineField({
          name: "secondaryLabel",
          title: "Secundaire knop tekst",
          type: "string",
          initialValue: "Gratis advies",
        }),
        // 👇 EN DIE MOET HIERBIJ:
        defineField({
          name: "secondaryLink",
          title: "Secundaire knop link",
          type: "string",
          description: "Bijv. /contact?type=advies",
          initialValue: "/contact?type=advies",
        }),
      ],
    }),

  ],

  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
})