<script setup lang="ts">
import type { Product } from '~/server/api/products'

const route = useRoute()
const routeQuery = computed(() => route.query)

const query = computed(() => ({
  ...route.query,
}))

const { data, status } = await useFetch(() => `/api/products`, {
  query,
})

const activeFilters = ref(data.value?.meta.activeFilters)
const searchQuery = ref('')

const cart = useCartStore()
const toast = useToast()

function addToCart(product: Product) {
  cart.addToCart(product)
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
          v-model="activeFilters" selection-mode="checkbox" :options="data?.filters" placeholder="Filter by category"
          @update:model-value="filters => navigateTo({
            query: { ...route.query, filters: Object.keys(filters).join(',') },
          })"
        >
          <template #value="{ value, placeholder }">
            {{ Object.keys(value).length ? 'Filters applied' : placeholder }}
          </template>
        </TreeSelect>

        <InputGroup class="w-max">
          <InputText v-model="searchQuery" size="small" placeholder="Search..." />
          <Button
            size="small" severity="secondary" @click="navigateTo({
              query: { ...route.query, search: searchQuery },
            })"
          >
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
