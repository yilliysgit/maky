import { type SchemaTypeDefinition } from 'sanity'
import project from './project'
import category from './category'
import subcategory from './subcategory'
import services from './services' 
import homepage from './homepage'
import subService from './subService' 

import categoryHeroSection from './blocks/categoryHeroSection'
import categoryIntroSection from './blocks/categoryIntroSection'
import featuredProjectsSection from './blocks/featuredProjectsSection'
import relatedServicesSection from './blocks/relatedServicesSection'
import serviceListSection from './blocks/serviceListSection'
import imageTextSection from './blocks/imageTextSection'
import subServiceSelectorSection from './blocks/subServiceSelectorSection' 
import processSection from './blocks/processSection'
import uspSection from './blocks/uspSection'
import faqSection from './blocks/faqSection'
import ctaSection from './blocks/ctaSection'
import productStylesSection from './blocks/productStylesSection'
import materialSamplesSection from './blocks/materialSamplesSection'
import popupProjectsSection from './blocks/popupProjectsSection'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    category,
    subcategory,
    services, 
    homepage,
    subService, 
    categoryHeroSection,
    categoryIntroSection,
    featuredProjectsSection,
    relatedServicesSection,
    serviceListSection,
    imageTextSection,
    subServiceSelectorSection, 
    processSection,
    uspSection,
    faqSection,
    ctaSection,
    productStylesSection, 
    materialSamplesSection,
    popupProjectsSection,
  ],
}