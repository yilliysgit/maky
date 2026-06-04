import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // 1. HERO
    defineField({ name: 'projectName', title: 'Projectnaam', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'projectName' } }),

    defineField({
  name: 'subcategory',
  title: 'Subcategorie',
  type: 'reference',
  to: [{ type: 'subcategory' }],
}),


    defineField({
  name: 'featuredImage',
  title: 'Featured image (voor overzichtspagina)',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
  ],
}),

    
    defineField({
      name: 'heroImage',
      title: 'Hero afbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
      ],
    }),
    defineField({ name: 'heroTagline', title: 'Één feitelijke zin', type: 'string' }),


    defineField({ name: 'location', title: 'Locatie', type: 'string' }),
    defineField({ name: 'projectDate', title: 'Datum', type: 'date' }),
defineField({
  name: 'client',
  title: 'Opdrachtgever',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Naam', type: 'string' }),
    defineField({ name: 'url', title: 'Website URL', type: 'url' }),
  ],
}),


    // 2. CONTEXT
    defineField({ name: 'context', title: 'Projectcontext', type: 'text', rows: 5 }),

    // 3. WAT MAKY DEED
    defineField({
      name: 'scope',
      title: 'Wat MAKY heeft gedaan',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // 4. PROJECTBEELDEN
    defineField({
      name: 'projectImages',
      title: 'Projectbeelden',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
        ],
      }],
    }),

    // 5. AANPAK / PROCES
    defineField({
      name: 'processSteps',
      title: 'Aanpak / processtappen',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // 6. RESULTAAT
    defineField({ name: 'result', title: 'Resultaat', type: 'text', rows: 4 }),

    // 7. CTA
    defineField({ name: 'ctaText', title: 'CTA tekst', type: 'string' }),
    defineField({ name: 'ctaButton', title: 'CTA knoptekst', type: 'string' }),
  ],
})