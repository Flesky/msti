import type { TreeNode } from 'primevue/treenode'
import { z } from 'zod'
import equipmentData from '~/mock/equipmentData.json'

const filters: TreeNode[] = [
  {
    key: 'EKG/ECG',
    label: 'EKG/ECG',
    children: [
      { key: 'One Piece Reusable EKG Cables', label: 'One Piece Reusable EKG Cables' },
      { key: 'EKG Trunk Cables', label: 'EKG Trunk Cables' },
      { key: 'EKG Lead Wires', label: 'EKG Lead Wires' },
      { key: 'Disposable ECG Lead Wires', label: 'Disposable ECG Lead Wires' },
      { key: 'Reusable ECG Lead Wires', label: 'Reusable ECG Lead Wires' },
      { key: 'ECG Trunk Cables', label: 'ECG Trunk Cables' },
      { key: 'One Piece Disposable ECG Cables', label: 'One Piece Disposable ECG Cables' },
      { key: 'One Piece Reusable ECG Cables', label: 'One Piece Reusable ECG Cables' },
      { key: 'Telemetry ECG Cables', label: 'Telemetry ECG Cables' },
      { key: 'ECG Accessories', label: 'ECG Accessories' },
    ],
  },
  {
    key: 'SPO2',
    label: 'SPO2',
    children: [
      { key: 'SpO2 Interface Cables', label: 'SpO2 Interface Cables' },
      { key: 'Disposable SpO2 Sensors', label: 'Disposable SpO2 Sensors' },
      { key: 'Reusable SpO2 Sensors', label: 'Reusable SpO2 Sensors' },
    ],
  },
  {
    key: 'NIBP',
    label: 'NIBP',
    children: [
      { key: 'Disposable NIBP Cuffs', label: 'Disposable NIBP Cuffs' },
      { key: 'Reusable NIBP Cuffs', label: 'Reusable NIBP Cuffs' },
      { key: 'NIBP Air Hose', label: 'NIBP Air Hose' },
      { key: 'NIBP Connectors', label: 'NIBP Connectors' },
    ],
  },
  {
    key: 'IBP',
    label: 'IBP',
    children: [
      { key: 'Disposable IBP Transducers', label: 'Disposable IBP Transducers' },
      { key: 'IBP Adapter Cables', label: 'IBP Adapter Cables' },
    ],
  },
  {
    key: 'Temp Probes',
    label: 'Temp Probes',
    children: [
      { key: 'Temperature Adapter Cables', label: 'Temperature Adapter Cables' },
      { key: 'Reusable Temperature Probes', label: 'Reusable Temperature Probes' },
      { key: 'Disposable Temperature Probes', label: 'Disposable Temperature Probes' },
      { key: 'Smart Temperature Probes', label: 'Smart Temperature Probes' },
    ],
  },
  {
    key: 'Oxygen Sensor',
    label: 'Oxygen Sensor',
  },
  {
    key: 'Fetal Transducer',
    label: 'Fetal Transducer',
  },
]

const paginationSchema = z.object({
  page: z.coerce.number().int().positive(),
  filters: z.array(z.string()).optional(),
})

export interface Product {
  url: string
  data: {
    product_name: string
    part_number: string
    images: Array<string>
    oem_reference: {
      [key: string]: string | number
    }
    compatibility: {
      manufacturer: string
      [key: string]: string | number
    }
    technical_specifications: {
      category: string
      [key: string]: string | number
    }
  }
}

export default defineEventHandler(async (event) => {
  const { data } = await getValidatedQuery(event, body => paginationSchema.safeParse(body))
  console.log(data)

  const { page, filters } = data || { page: 1 }

  const perPage = 20
  const start = (page - 1) * perPage
  const end = start + perPage

  console.log(!!filters, filters, page, data)
  const filteredData = filters ? equipmentData.filter(product => filters.includes(product.data.technical_specifications.category)) : equipmentData

  return {
    products: filteredData.slice(start, end).map((product, id) => ({ ...product, id })),
    meta: {
      total: filteredData.length,
      page,
      perPage,
    },
  } as { products: Array<Product>, meta: { total: number, page: number, perPage: number } }
})
