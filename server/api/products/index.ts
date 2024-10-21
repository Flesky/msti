import { z } from 'zod'
import equipmentData from '~/mock/equipmentData.json'

const paginationSchema = z.object({
  page: z.coerce.number().int().positive(),
})

export default defineEventHandler(async (event) => {
  const { data } = await getValidatedQuery(event, body => paginationSchema.safeParse(body))

  const { page } = data || { page: 1 }

  const perPage = 20
  const start = (page - 1) * perPage
  const end = start + perPage

  return {
    products: equipmentData.slice(start, end).map((product, id) => ({ ...product, id })),
    meta: {
      total: equipmentData.length,
      page,
      perPage,
    },
  }
})
