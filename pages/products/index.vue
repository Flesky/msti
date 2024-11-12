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
const { toggleLike, isLiked } = useWishlistStore()

const paginationDisplay = computed(() => {
  const page = data.value?.meta.pagination.page
  const perPage = data.value?.meta.pagination.perPage
  const totalItems = data.value?.meta.pagination.totalItems

  return `Showing ${((page - 1) * perPage) + 1} to ${Math.min(page * perPage, totalItems)} of ${totalItems} products`
})
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-4 py-12">
    <div class="flex flex-col justify-between gap-x-12 gap-y-4 md:flex-row">
      <h1 class="text-4xl font-medium">
        Products
      </h1>

      <div class="flex flex-col gap-2 md:flex-row">
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

        <InputGroup class="w-full md:w-56">
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

    <div class="mt-6 flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
      <p class="text-center text-muted-color">
        {{ paginationDisplay }}
      </p>
      <Paginator
        class="mt-2"
        :rows="20" :first="(Number(data?.meta.pagination.page) - 1) * 20" :total-records="data?.meta.pagination.totalItems"
        @update:first="page => navigateTo({
          query: { page: page / 20 + 1 },
        })"
      />
    </div>

    <div class="mt-4 grid grid-cols-2 gap-1 md:grid-cols-4 xl:grid-cols-5">
      <NuxtLink v-for="product in data?.products" v-slot="{ navigate }" :key="product.url" :to="`/products/${product.id}`" custom>
        <Card :pt="{ root: 'rounded-none border shadow-none', title: 'min-h-40' }" @click="navigate">
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
            <div class="mt-2 flex items-center gap-1.5" @click.prevent="">
              <Button class="shrink-0" variant="outlined" @click="">
                <template #icon>
                  <Icon name="tabler:heart" class="text-xl" />
                </template>
              </Button>
              <Button label="Add to cart" class="grow" @click="addToCart(product)">
                <template #icon>
                  <Icon name="tabler:shopping-cart" class="text-xl" />
                </template>
              </Button>
            </div>
          </template>
        </Card>
      </NuxtLink>
    </div>

    <div class="mt-4 flex w-full flex-col items-center justify-between gap-x-4 md:flex-row">
      <p class="text-center text-muted-color">
        {{ paginationDisplay }}
      </p>
      <Paginator
        class="mt-2"
        :rows="20" :first="(Number(data?.meta.pagination.page) - 1) * 20" :total-records="data?.meta.pagination.totalItems"
        @update:first="page => navigateTo({
          query: { page: page / 20 + 1 },
        })"
      />
    </div>
  </div>
</template>
