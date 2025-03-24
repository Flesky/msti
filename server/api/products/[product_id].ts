import { z } from 'zod'
import { api } from '~/server/utils/api'

export interface Root {
  data: Array<Product>
}

export interface Product {
  id: number
  documentId: string
  part_number: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  product_name: string
  product_id: string
  oem_reference: string
  compatibility: string
  technical_specifications: string
  images: Array<string>
  product_category_string: string
}

const getByProductIdSchema = z.object({
  product_id: z.string(),
})

export default defineEventHandler(async (event) => {
  const { product_id } = await getValidatedRouterParams(event, getByProductIdSchema.parse)

  const url = `/products?filters[product_id][$eq]=${product_id}`
  const res = (await api<Root>(url)).data
  if (!res.length)
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  return res[0]
})
