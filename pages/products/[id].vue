<script setup lang="ts">
import type { Product } from '~/server/api/products'

const route = useRoute()
const { data } = await useFetch<Product>(`/api/products/${route.params.id}`)

// Convert snake case to title case
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}
const specs = Object.entries(data.value.data.technical_specifications).map(([name, value]) => ({ name: toTitleCase(name), value }))

const quantity = ref(1)
</script>

<template>
  <div class="p-4 mt-8">
    <div class="lg:flex-row flex flex-col gap-6">
      <div class="lg:max-w-lg w-full">
        <ClientOnly>
          <Galleria :value="data.data.images" :num-visible="5">
            <template #item="{ item }">
              <img :src="item">
            </template>
            <template #thumbnail="{ item }">
              <img class="border border-gray-200" :src="item">
            </template>
          </Galleria>
        </ClientOnly>
      </div>
      <div>
        <h1 class="text-4xl font-medium">
          {{ data.data.product_name }}
        </h1>
        <p class="text-muted-color mt-2">
          Part number: {{ data.data.part_number }}
        </p>

        <div class="mt-12">
          <label for="quantity" class="font-medium">Quantity</label>
          <InputNumber v-model="quantity" input-id="quantity" class="w-40 ml-4 shrink-0" show-buttons button-layout="horizontal" :step="1" :min="1" fluid>
            <template #decrementbuttonicon>
              <Icon name="tabler:minus" />
            </template>
            <template #incrementbuttonicon>
              <Icon name="tabler:plus" />
            </template>
          </InputNumber>
        </div>
        <Button label="Add to cart" class="w-full mt-4" />

        <h2 class="text-2xl font-medium mt-14">
          Technical Specifications
        </h2>
        <DataTable striped-rows :value="specs">
          <Column field="name" />
          <Column field="value" />
        </DataTable>
      </div>
    </div>
  </div>
</template>
