import { z } from 'zod'
import type { Product } from '~/mock/products'
import PRODUCTS from '~/mock/products'

const idSchema = z.object({
  id: z.string(),
})

export default defineEventHandler(async (event): Promise<Product> => {
  const id = await getRouterParam(event, 'id')

  const product = PRODUCTS.find(p => p.id === id)
  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found',
    })
  }

  return product
})
