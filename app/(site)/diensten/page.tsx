// app/(site)/diensten/page.tsx
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { categoriesQuery } from '@/sanity/lib/catQueries'
import ServicesGridNew from '@/components/diensten/ServiceGridNew'

export default async function DienstenPage() {
  const categories = await client.fetch(categoriesQuery)
  return <ServicesGridNew categories={categories} />
}