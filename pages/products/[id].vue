<script setup lang="ts">
const route = useRoute()
const { data: product } = await useFetch(`/api/products/${route.params.id}`)
</script>

<template>
  <div class="grid grid-cols-2 gap-2 p-4">
    <Card class="border" :pt="{ header: 'brightness-50 rounded-2xl' }">
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
  </div>
</template>
