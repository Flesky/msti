<script setup lang="ts">
const route = useRoute()
const query = computed(() => ({
  ...route.query,
}))

const { data, status } = await useFetch(() => `/api/products`, {
  query,
})

const activeFilters = ref(data.value?.meta.filters)
const searchQuery = ref(data.value?.meta.search)

const { addToCart } = useCartStore()

const paginationDisplay = computed(() => {
  const page = data.value?.meta.pagination.page
  const perPage = data.value?.meta.pagination.perPage
  const totalItems = data.value?.meta.pagination.totalItems

  return `Showing ${((page - 1) * perPage) + 1} to ${Math.min(page * perPage, totalItems)} of ${totalItems} products`
})
</script>

<template>
  <div class="mx-auto mt-8 max-w-screen-xl p-4">
    <div class="flex flex-wrap justify-between gap-x-12 gap-y-4">
      <h1 class="text-4xl font-medium">
        Products
      </h1>

      <div class="flex flex-wrap gap-x-4 gap-y-2">
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
      {{ paginationDisplay }}
    </p>

    <Paginator
      class="my-4"
      :rows="20" :first="(Number(data?.meta.pagination.page) - 1) * 20" :total-records="data?.meta.pagination.totalItems"
      @update:first="page => navigateTo({
        query: { ...route.query, page: page / 20 + 1 },
      })"
    />

    <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
      <NuxtLink v-for="product in data?.products" v-slot="{ navigate }" :key="product.url" :to="`products/${product.id}`" custom>
        <Card class="border" :pt="{ root: 'rounded-none', title: 'min-h-40' }" @click="navigate">
          <template #header>
            <img class="aspect-[3/2] object-cover" alt="user header" :src="product.data.images[0]">
          </template>
          <template #title>
            <h2 class="line-clamp-3">
              {{ product.data.product_name }}
            </h2>
            <div class="mt-2 text-base font-normal text-muted-color">
              <div>{{ product.data.part_number }}</div>
              <div>{{ product.data.technical_specifications.category }}</div>
            </div>
          </template>
          <template #footer>
            <Button label="Add to cart" class="w-full" @click.prevent="addToCart(product)" />
          </template>
        </Card>
      </NuxtLink>
    </div>

    <Paginator
      class="my-4"
      :rows="20" :first="(Number(data?.meta.pagination.page) - 1) * 20" :total-records="data?.meta.pagination.totalItems"
      @update:first="page => navigateTo({
        query: { page: page / 20 + 1 },
      })"
    />
  </div>
</template>
