import { z } from 'zod'
import { api } from '~/server/utils/api'

interface Root {
  data: Array<{
    id: number
    documentId: string
    product_name: string
    product_identifier?: string
    product_description?: string
    product_images: Array<string>
    technical_specifications: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    product_subtitle: string
    product_category_string: string
    product_subcategory_string: string
  }>
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const getSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(20).default(20),
  // sort: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
})

export default defineEventHandler(async (event) => {
  const params = await getValidatedQuery(event, getSchema.parse)
  const { page, pageSize, category, search, brand } = params

  const url = `/rigel-products?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    + `${category ? `&filters[product_category_string][$eq]=${category}` : ''}`
    + `${brand ? `&filters[product_name][$containsi]=${brand}` : ''}`
    + `${search ? `&filters[product_name][$containsi]=${search}` : ''}`
  const res = await api<Root>(url)
  console.log(`SUCCESS: ${url}`)
  return {
    ...res,
  }
})
