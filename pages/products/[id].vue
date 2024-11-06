<script setup lang="ts">
const route = useRoute()
const { data: product } = await useFetch(`/api/products/${route.params.id}`)

// Convert snake case to title case
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}
const specs = Object.entries(product.value?.data.technical_specifications).map(([name, value]) => ({ name: toTitleCase(name), value }))

const quantity = ref(1)
const { addToCart } = useCartStore()
</script>

<template>
  <ClientOnly>
    <div class="mx-auto mt-8 flex max-w-screen-xl flex-col justify-center gap-8 p-4 lg:flex-row">
      <div class="w-full lg:max-w-xl">
        <Galleria :value="product?.data.images" :num-visible="5">
          <template #item="{ item }">
            <img :src="item">
          </template>
          <template #thumbnail="{ item }">
            <img class="max-h-16 border border-gray-200" :src="item">
          </template>
        </Galleria>
      </div>
      <div>
        <h1 class="text-4xl font-medium">
          {{ product?.data.product_name }}
        </h1>
        <p class="mt-2 text-muted-color">
          Part number: {{ product?.data.part_number }}
        </p>

        <div class="mt-12">
          <label for="quantity" class="font-medium">Quantity</label>
          <InputNumber v-model="quantity" input-id="quantity" class="ml-4 w-40 shrink-0" show-buttons button-layout="horizontal" :step="1" :min="1" fluid>
            <template #decrementbuttonicon>
              <Icon name="tabler:minus" />
            </template>
            <template #incrementbuttonicon>
              <Icon name="tabler:plus" />
            </template>
          </InputNumber>
        </div>
        <Button label="Add to cart" class="mt-4 w-full" @click="addToCart(product, quantity)" />

        <h2 class="mt-14 text-2xl font-medium">
          Technical Specifications
        </h2>
        <DataTable striped-rows :value="specs">
          <Column field="name" />
          <Column field="value" />
        </DataTable>
      </div>
    </div>
  </ClientOnly>
</template>
