import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import category from './category'
import subcategory from './subcategory'
import services from './services'
import homepage from './homepage'

import categoryHeroSection from './blocks/categoryHeroSection'
import categoryIntroSection from './blocks/categoryIntroSection'
import featuredProjectsSection from './blocks/featuredProjectsSection'
import serviceListSection from './blocks/serviceListSection'
import imageTextSection from './blocks/imageTextSection'
import processSection from './blocks/processSection'
import uspSection from './blocks/uspSection'
import faqSection from './blocks/faqSection'
import ctaSection from './blocks/ctaSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    category,
    subcategory,
    services,
    homepage,
    categoryHeroSection,
    categoryIntroSection,
    featuredProjectsSection,
    serviceListSection,
    imageTextSection,
    processSection,
    uspSection,
    faqSection,
    ctaSection,
  ],
}