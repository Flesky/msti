import { z } from 'zod'
import equipmentData from '~/mock/equipmentData.json'

const idSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export default defineEventHandler(async (event) => {
  const id = await getRouterParam(event, 'id')

  return equipmentData[id]
})
