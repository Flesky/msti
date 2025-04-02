import { z } from 'zod'
import { api } from '~/server/utils/api'

interface Root {
  data: {
    id: number
    documentId: string
    product_name: string
    product_identifier: string
    product_description: string
    product_images: Array<string>
    technical_specifications: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    product_subtitle: string
    product_category_string: string
    product_subcategory_string: string
  }
  meta: {}
}

const getByProductIdSchema = z.object({
  product_id: z.string(),
})

export default defineEventHandler(async (event) => {
  const { product_id } = await getValidatedRouterParams(event, getByProductIdSchema.parse)

  const url = `/rigel-products/${product_id}`
  const data = (await api<Root>(url)).data
  if (!data)
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  return data
})
