import type { TreeNode } from 'primevue/treenode'
import { z } from 'zod'
import type { Product } from '~/mock/products'
import PRODUCTS from '~/mock/products'

// Filter keys must be unique
// Nodes can't have commas!
const FILTER_OPTIONS: TreeNode[] = [
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

function flattenAndAssignIds(tree: TreeNode[]): { availableFilters: TreeNode[], mappedFilters: Map<string, string> } {
  let i = 1
  const mappedFilters = new Map<string, string>()

  const assignId = (node: TreeNode): TreeNode => {
    const key = String(i++)
    const newNode = { ...node, key }
    mappedFilters.set(key, node.label || node.key)

    if (node.children && node.children.length) {
      newNode.children = node.children.map(assignId)
    }
    return newNode
  }

  return { availableFilters: tree.map(assignId), mappedFilters }
}

const { availableFilters, mappedFilters } = flattenAndAssignIds(FILTER_OPTIONS)

function showFilterStatus(appliedFilters: string[]) {
  const appliedFilterSet = new Set(appliedFilters)
  const status: Record<string, { checked: boolean, partiallyChecked: boolean }> = {}

  const traverse = (node: TreeNode): { checked: boolean, partiallyChecked: boolean } => {
    if (node.children?.length) {
      const childStatuses = node.children.map(traverse)
      const allChecked = childStatuses.every(s => s.checked)
      const anyChecked = childStatuses.some(s => s.checked || s.partiallyChecked)
      const nodeStatus = {
        checked: allChecked,
        partiallyChecked: anyChecked && !allChecked,
      }
      if (anyChecked)
        status[node.key] = nodeStatus
      return nodeStatus
    }
    else {
      const isChecked = appliedFilterSet.has(node.key)
      if (isChecked)
        status[node.key] = { checked: true, partiallyChecked: false }
      return { checked: isChecked, partiallyChecked: false }
    }
  }

  availableFilters.forEach(traverse)
  return status
}

function showFilteredProducts(data: Product[], appliedFilters: string[]) {
  const selectedLabels = new Set<string>()
  appliedFilters.forEach((key) => {
    const label = mappedFilters.get(key)
    if (label)
      selectedLabels.add(label)
  })

  return data.filter(product => selectedLabels.has(product.data.technical_specifications.category))
}

const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  search: z.string().optional(),
  filters: z.string().transform(val => val.length ? val.split(',') : undefined).optional(), // Example: 22,23,24,27
})

interface Products {
  products: Product[]
  filters: TreeNode[]
  meta: {
    pagination: {
      totalItems: number
      page: number
      perPage: number
    }
    filters: Record<string, {
      checked: boolean
      partiallyChecked: boolean
    }>
    search: string
  }
}

export default defineEventHandler(async (event): Promise<Products> => {
  const { data: params } = await getValidatedQuery(event, paginationSchema.safeParse)
  const { page = 1, filters, search } = params || { }

  const perPage = 20
  const start = (page - 1) * perPage
  const end = start + perPage

  let products = PRODUCTS

  if (filters)
    products = showFilteredProducts(products, filters)
  if (search)
    products = products.filter(product => Object.values(product).join(' ').toLowerCase().includes(search.toLowerCase()))

  return {
    products: products.slice(start, end),
    filters: availableFilters,
    meta: {
      pagination: {
        totalItems: products.length,
        page,
        perPage,
      },
      filters: showFilterStatus(filters || []),
      search: search || '',
    },
  }
})
