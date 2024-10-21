<script setup lang="ts">
const route = useRoute()
const { data } = await useFetch(`/api/products?page=${route.query.page || 1}`)
</script>

<template>
  <Paginator :rows="10" :total-records="data?.meta.total" />
  <div class="grid grid-cols-2 gap-2">
    <NuxtLink v-for="product in data?.products" v-slot="{ navigate }" :to="`products/${product.id}`" custom>
      <Card class="border" :pt="{ header: 'brightness-50 rounded-2xl', title: 'min-h-28' }" @click="navigate">
        <template #header>
          <img alt="user header" :src="product.data.images[0]">
        </template>
        <template #title>
          {{ product.data.product_name }}
        </template>
        <template #footer>
          <Button label="Add to cart" class="w-full" />
        </template>
      </Card>
    </NuxtLink>
  </div>
</template>
