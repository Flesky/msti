<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core'
import { Button } from 'primevue'

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

const { data, status } = await useFetch(() => `/api/products/rigel`, {
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
    <h1 class="text-center text-4xl font-medium">
      Rigel Products
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
      <div class="grow @container">
        <div v-if="!data?.meta.pagination.total">
          No products found.
        </div>

        <div v-else class="grid grid-cols-2 gap-1 @3xl:grid-cols-3 @5xl:grid-cols-4 @7xl:grid-cols-5">
          <NuxtLink v-for="product in data?.data" v-slot="{ navigate }" :key="product.id" :to="`/products/rigel/${product.documentId}`" custom>
            <Card :pt="{ root: 'rounded-none border shadow-none', title: 'min-h-40' }" @click="navigate">
              <template #header>
                <Image v-if="product.product_images?.length" class="w-full" image-class="aspect-[3/2] w-full object-cover" :src="product.product_images[0]" />
                <div v-else class="aspect-[3/2] bg-surface-200" />
              </template>
              <template #title>
                <h2 class="line-clamp-3">
                  {{ product.product_name }}
                </h2>
                <div class="mt-2 text-base font-normal text-muted-color">
                  <div>{{ product.product_identifier }}</div>
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
  </div>
</template>
