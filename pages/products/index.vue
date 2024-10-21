<script setup lang="ts">
const route = useRoute()
const routeQuery = computed(() => route.query)
const { data, status } = await useFetch(() => `/api/products?page=${route.query.page || 1}`, {
  watch: [routeQuery],
})

const cart = useCookie('cart', { default: () => [] })

const toast = useToast()

function addToCart(product) {
  cart.value.push(product)
  toast
    .add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 3000 })
  console.log('toast?')
}
</script>

<template>
  <Paginator
    :rows="20" :first="(routeQuery.page ? Number(routeQuery.page) - 1 : 0) * 20" :total-records="data?.meta.total"
    @update:first="page => navigateTo({
      query: { page: page / 20 + 1 },
    })"
  />

  <div class="grid p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 max-w-screen-2xl mx-auto gap-2">
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
</template>
