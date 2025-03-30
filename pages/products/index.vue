<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { Button, Panel } from 'primevue'

// const SORT_OPTIONS = [{
//   name: 'Default sort',
//   query: 'default',
// }, {
//   name: 'Sort by product name',
//   query: 'name',
// }, {
//   name: 'Sort by part number',
//   query: 'part_number',
// }]

const route = useRoute()
const search = ref(route.query.search || '')
const selectedCategory = ref(route.query.category || undefined)
const selectedBrand = ref(route.query.brand || undefined)
const params = computed(() => ({
  page: route.query.page,
  search: route.query.search,
  category: route.query.category,
  brand: route.query.brand,
}))

const { data, status } = await useFetch(() => `/api/products`, {
  params,
})

const { addToCart } = useCartStore()
const { toggleLike, isLiked } = useWishlistStore()

const paginationDisplay = computed(() => {
  if (!data.value)
    return ''
  const { page, pageSize, total } = data.value?.meta?.pagination
  return `Showing ${((page - 1) * pageSize) + 1} to ${Math.min(page * pageSize, total)} of ${total} products`
})

const isMobile = useBreakpoints(breakpointsTailwind).smallerOrEqual('lg')
</script>

<template>
  <div class="mx-auto max-w-screen-2xl px-4 py-12">
    <h1 class="text-4xl font-medium">
      Products
    </h1>

    <div class="mt-6 flex h-12 w-full flex-col items-center justify-between gap-x-4 lg:flex-row">
      <p class="text-center text-muted-color">
        {{ paginationDisplay }}
      </p>
      <Paginator
        v-if="status === 'success'"
        class="mt-2"
        :rows="20" :first="(Number(data?.meta.pagination.page) - 1) * 20" :total-records="data?.meta.pagination.total"
        @update:first="page => navigateTo({
          query: { page: page / 20 + 1 },
        })"
      />
      <p v-else>
        Loading...
      </p>
    </div>

    <div class="mt-2 flex flex-col gap-4 lg:flex-row">
      <component :is="!isMobile ? 'div' : Panel" header="Filters" toggleable>
        <div class="flex shrink-0 flex-col lg:w-64">
          <InputGroup>
            <InputText v-model="search" placeholder="Search..." />
            <Button
              size="small"
              @click="navigateTo({
                query: { ...route.query, search },
              })"
            >
              <template #icon>
                <Icon class="text-3xl" name="tabler:search" />
              </template>
            </Button>
          </InputGroup>

          <!--          TODO: Re-enable sort -->
          <!--          <label for="categories" class="mb-2">Sort</label> -->
          <!--          <Select -->
          <!--            option-label="name" :options="SORT_OPTIONS" -->
          <!--            :default-value="SORT_OPTIONS.find( -->
          <!--              option => option.query === route.query.sort, -->
          <!--            ) || SORT_OPTIONS[0] -->
          <!--            " placeholder="Sort by" -->
          <!--            @update:model-value="sort => navigateTo({ -->
          <!--              query: { ...route.query, sort: sort.query }, -->
          <!--            })" -->
          <!--          /> -->
          <Divider />

          <label for="brands" class="mb-2">Brands</label>
          <div class="flex flex-col gap-1">
            <Button
              v-if="selectedBrand?.length"
              size="small" @click="() => {
                selectedBrand = ''
                navigateTo({
                  query: { ...route.query, brand: undefined },
                })
              }"
            >
              Deselect
            </Button>
            <div v-for="brand in data?.brands" class="flex items-center gap-2">
              <RadioButton
                v-model="selectedBrand"
                :input-id="brand"
                :name="brand"
                :value="brand"
                @update:model-value="navigateTo({
                  query: { ...route.query, brand },
                })"
              />
              <label :for="brand">{{ brand }}</label>
            </div>
          </div>

          <Divider />

          <label for="categories" class="mb-2">Categories</label>
          <div class="flex flex-col gap-1">
            <Button
              v-if="selectedCategory?.length"
              size="small" @click="() => {
                selectedCategory = ''
                navigateTo({
                  query: { ...route.query, category: undefined },
                })
              }"
            >
              Deselect
            </Button>
            <div v-for="category in data?.categories" class="flex items-center gap-2">
              <RadioButton
                v-model="selectedCategory"
                :input-id="category"
                :name="category"
                :value="category"
                @update:model-value="navigateTo({
                  query: { ...route.query, category },
                })"
              />
              <label :for="category">{{ category }}</label>
            </div>
          </div>

          <!--          <label for="categories" class="mb-2">Categories</label> -->
          <!--          <Tree -->
          <!--            v-model:selection-keys="activeFilters" -->
          <!--            input-id="categories" -->
          <!--            selection-mode="checkbox" :value="data?.categories" placeholder="Filter by category" -->
          <!--            :pt="{ root: 'bg-transparent p-0' }" -->
          <!--            @update:selection-keys="categories => navigateTo({ -->
          <!--              query: { ...route.query, categories: Object.keys(categories).join(',') }, -->
          <!--            })" -->
          <!--          > -->
          <!--            <template #value="{ value, placeholder }"> -->
          <!--              {{ Object.keys(value).length ? 'Filters applied' : placeholder }} -->
          <!--            </template> -->
          <!--          </Tree> -->

          <!--          <Divider /> -->

          <!--          <label for="brands" class="mb-2">Brands</label> -->
          <!--          <div class="flex flex-col gap-2"> -->
          <!--            <div v-for="{ brand, checked } in brandCheckboxes" class="flex items-center gap-2"> -->
          <!--              <Checkbox -->
          <!--                :input-id="brand" -->
          <!--              /> -->

          <!--              &lt;!&ndash;            v-model="checked" &ndash;&gt; -->
          <!--              <label :for="brand">{{ brand }}</label> -->
          <!--            </div> -->
          <!--          </div> -->
        </div>
      </component>

      <div class="grow @container">
        <div v-if="!data?.meta.pagination.total">
          No products found.
        </div>

        <div v-else class="grid grid-cols-2 gap-1 @3xl:grid-cols-3 @5xl:grid-cols-4 @7xl:grid-cols-5">
          <NuxtLink v-for="product in data?.data" v-slot="{ navigate }" :key="product.id" :to="`/products/${product.product_id}`" custom>
            <Card :pt="{ root: 'rounded-none border shadow-none', title: 'min-h-40' }" @click="navigate">
              <template #header>
                <Image v-if="product.images?.length" class="w-full" image-class="aspect-[3/2] w-full object-cover" :src="product.images[0]" />
                <div v-else class="aspect-[3/2] bg-surface-200" />
              </template>
              <template #title>
                <h2 class="line-clamp-3">
                  {{ product.product_name }}
                </h2>
                <div class="mt-2 text-base font-normal text-muted-color">
                  <div>{{ product.part_number }}</div>
                  <!--                  <div>{{ product.data.technical_specifications.category }}</div> -->
                </div>
              </template>
              <template #footer>
                <div class="flex items-center gap-1.5" @click.prevent="">
                  <Button severity="danger" class="shrink-0" :variant="isLiked(product.id) ? undefined : 'outlined'" @click="toggleLike(product.id)">
                    <template #icon>
                      <Icon name="tabler:heart" class="text-xl" />
                    </template>
                  </Button>
                  <Button label="Add to cart" class="grow" @click="addToCart(product)" />
                </div>
              </template>
            </Card>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!--    <div class="mt-4 flex w-full flex-col items-center justify-between gap-x-4 lg:flex-row"> -->
    <!--      <p class="text-center text-muted-color"> -->
    <!--        {{ paginationDisplay }} -->
    <!--      </p> -->
    <!--      <Paginator -->
    <!--        class="mt-2" -->
    <!--        :rows="20" :first="(Number(data?.meta.pagination.page) - 1) * 20" :total-records="data?.meta.pagination.total" -->
    <!--        @update:first="page => navigateTo({ -->
    <!--          query: { page: page / 20 + 1 }, -->
    <!--        })" -->
    <!--      /> -->
    <!--    </div> -->
  </div>
</template>
