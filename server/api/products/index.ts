import { z } from 'zod'
import { api } from '~/server/utils/api'

export interface Root {
  data: Array<{
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

const categories: string[] = [
  'One Piece Reusable EKG Cables',
  'EKG Trunk Cables',
  'EKG Lead Wires',
  'Disposable ECG Lead Wires',
  'Reusable ECG Lead Wires',
  'ECG Trunk Cables',
  'One Piece Disposable ECG Cables',
  'One Piece Reusable ECG Cables',
  'Telemetry ECG Cables',
  'ECG Accessories',
  'SpO2 Interface Cables',
  'Disposable SpO2 Sensors',
  'Reusable SpO2 Sensors',
  'Disposable NIBP Cuffs',
  'Reusable NIBP Cuffs',
  'NIBP Air Hose',
  'NIBP Connectors',
  'Disposable IBP Transducers',
  'IBP Adapter Cables',
  'Temperature Adapter Cables',
  'Reusable Temperature Probes',
  'Disposable Temperature Probes',
  'Smart Temperature Probes',
  'Oxygen Sensor',
  'Fetal Transducer',
]

const brands: string[] = [
  'Spacelabs',
  'Philips',
  'GE',
]

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

  const url = `/products?pagination[page]=${page}&pagination[pageSize]=${pageSize}`
    + `${category ? `&filters[product_category_string][$eq]=${category}` : ''}`
    + `${brand ? `&filters[product_name][$containsi]=${brand}` : ''}`
    + `${search ? `&filters[product_name][$containsi]=${search}` : ''}`
  console.log(url)
  const res = await api<Root>(url)
  return {
    ...res,
    categories,
    brands,
  }
})
