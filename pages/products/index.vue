<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { Panel } from 'primevue'

const route = useRoute()
const query = computed(() => ({
  ...route.query,
}))

const SORT_OPTIONS = [{
  name: 'Default sort',
  query: 'default',
}, {
  name: 'Sort by product name',
  query: 'name',
}, {
  name: 'Sort by part number',
  query: 'part_number',
}]

const { data, status } = await useFetch(() => `/api/products`, {
  query,
})

const activeFilters = ref(data.value?.meta.categories)
const searchQuery = ref(data.value?.meta.search)
const brandCheckboxes = reactive(data.value?.brands.map(brand => ({
  brand,
  checked: false,
})) || [])

const { addToCart } = useCartStore()
const { toggleLike, isLiked } = useWishlistStore()

const paginationDisplay = computed(() => {
  const page = data.value?.meta.pagination.page
  const perPage = data.value?.meta.pagination.perPage
  const totalItems = data.value?.meta.pagination.totalItems

  return `Showing ${((page - 1) * perPage) + 1} to ${Math.min(page * perPage, totalItems)} of ${totalItems} products`
})

const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual('lg')
</script>

<template>
  <div class="mx-auto max-w-screen-2xl px-4 py-12">
    <h1 class="text-4xl font-medium">
      Products
    </h1>

    <div class="mt-6 flex w-full flex-col items-center justify-between gap-x-4 lg:flex-row">
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

    <div class="mt-2 flex flex-col gap-4 lg:flex-row">
      <component :is="isMobile ? Panel : 'div'" header="Filters" toggleable>
        <div class="flex shrink-0 flex-col lg:w-64">
          <InputGroup>
            <InputText v-model="searchQuery" placeholder="Search..." />
            <Button
              size="small"
              @click="navigateTo({
                query: { ...route.query, search: searchQuery },
              })"
            >
              <template #icon>
                <Icon class="text-3xl" name="tabler:search" />
              </template>
            </Button>
          </InputGroup>

          <Divider />

          <label for="categories" class="mb-2">Sort</label>
          <!-- TODO: Use query param -->
          <Select
            option-label="name" :options="SORT_OPTIONS"
            :default-value="SORT_OPTIONS.find(
              option => option.query === route.query.sort,
            ) || SORT_OPTIONS[0]
            " placeholder="Sort by"
            @update:model-value="sort => navigateTo({
              query: { ...route.query, sort: sort.query },
            })"
          />

          <Divider />

          <label for="categories" class="mb-2">Categories</label>
          <Tree
            v-model:selection-keys="activeFilters"
            input-id="categories"
            selection-mode="checkbox" :value="data?.categories" placeholder="Filter by category"
            :pt="{ root: 'bg-transparent p-0' }"
            @update:selection-keys="categories => navigateTo({
              query: { ...route.query, categories: Object.keys(categories).join(',') },
            })"
          >
            <template #value="{ value, placeholder }">
              {{ Object.keys(value).length ? 'Filters applied' : placeholder }}
            </template>
          </Tree>

          <Divider />

          <label for="brands" class="mb-2">Brands</label>
          <div class="flex flex-col gap-2">
            <div v-for="{ brand, checked } in brandCheckboxes" class="flex items-center gap-2">
              <Checkbox
                :input-id="brand"
              />

              <!--            v-model="checked" -->
              <label :for="brand">{{ brand }}</label>
            </div>
          </div>
        </div>
      </component>

      <div class="grow @container">
        <div class="grid grid-cols-2 gap-1 @3xl:grid-cols-3 @5xl:grid-cols-4 @7xl:grid-cols-5">
          <NuxtLink v-for="product in data?.products" v-slot="{ navigate }" :key="product.url" :to="`/products/${product.id}`" custom>
            <Card :pt="{ root: 'rounded-none border shadow-none', title: 'min-h-40' }" @click="navigate">
              <template #header>
                <Image class="w-full" image-class="aspect-[3/2] w-full object-cover" :src="product.data.images[0]" />
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
                  <Button severity="danger" class="shrink-0" :variant="isLiked(product.id) ? undefined : 'outlined'" @click="toggleLike(product.id)">
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
      </div>
    </div>

    <div class="mt-4 flex w-full flex-col items-center justify-between gap-x-4 lg:flex-row">
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
