<script setup lang="ts">
import type { TreeNode } from 'primevue/treenode'
import { useStorage } from '@vueuse/core'
import type { Product } from '~/server/api/products'

// Nodes can't have commas!
const nodes: TreeNode[] = [
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

const route = useRoute()
const routeQuery = computed(() => route.query)
const { data, status } = await useFetch(() => `/api/products?page=${route.query.page || 1}`, {
  watch: [computed(() => route.query)],
})

const activeFilters = ref([])

const cart = useStorage<{ product: Product, quantity: number }>('cart', [])

const toast = useToast()

function addToCart(product) {
  if (!cart.value.find(item => item.id === product.id)) {
    cart.value.push({ product, quantity: 1 })
  }
  else {
    const index = cart.value.findIndex(item => item.id === product.id)
    cart.value[index].quantity++
  }
  toast
    .add({ severity: 'success', summary: `Added product ${product.data.product_name} to cart`, life: 3000 })
}
</script>

<template>
  <div class="p-4 mt-8 mx-auto max-w-screen-2xl">
    <div class="flex flex-col sm:flex-row gap-2 justify-between">
      <h1 class="text-4xl font-medium">
        Products
      </h1>

      <div class="flex gap-4">
        <TreeSelect
          v-model="activeFilters" selection-mode="checkbox" :options="nodes" placeholder="Filter by category"
          @update:model-value="filters => navigateTo({
            query: { ...route.query, filters: Object.keys(filters).join(',') },
          })"
        >
          <template #value="{ value, placeholder }">
            {{ Object.keys(value).length ? 'Filters applied' : placeholder }}
          </template>
        </TreeSelect>

        <InputGroup class="w-max">
          <InputText size="small" placeholder="Search..." />
          <Button size="small" severity="secondary">
            <template #icon>
              <Icon class="text-3xl" name="tabler:search" />
            </template>
          </Button>
        </InputGroup>
      </div>
    </div>

    <p class="mt-2 text-muted-color">
      Showing {{ (data.meta.page - 1) * data.meta.perPage + 1 }} - {{
        Math.min(data.meta.page * data.meta.perPage, data.meta.total)
      }} of {{ data.meta.total }} products
    </p>

    <Paginator
      class="my-4"
      :rows="20" :first="(routeQuery.page ? Number(routeQuery.page) - 1 : 0) * 20" :total-records="data?.meta.total"
      @update:first="page => navigateTo({
        query: { ...route.query, page: page / 20 + 1 },
      })"
    />

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 max-w-screen-2xl mx-auto gap-2">
      <NuxtLink v-for="product in data?.products" v-slot="{ navigate }" :key="product.url" :to="`products/${product.id}`" custom>
        <Card class="border" :pt="{ root: 'rounded-none', title: 'min-h-32 line-clamp-4' }" @click="navigate">
          <template #header>
            <img alt="user header" :src="product.data.images[0]">
          </template>
          <template #title>
            {{ product.data.product_name }}
          </template>
          <template #footer>
            <Button label="Add to cart" class="w-full" @click.prevent="addToCart(product)" />
          </template>
        </Card>
      </NuxtLink>
    </div>

    <Paginator
      class="my-4"
      :rows="20" :first="(routeQuery.page ? Number(routeQuery.page) - 1 : 0) * 20" :total-records="data?.meta.total"
      @update:first="page => navigateTo({
        query: { page: page / 20 + 1 },
      })"
    />
  </div>
</template>
