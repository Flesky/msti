<script setup lang="ts">
const route = useRoute()
const { data: product } = await useFetch(`/api/products/${route.params.id}`)

const quantity = ref(1)
const { addToCart } = useCartStore()
</script>

<template>
  <div class="mx-auto flex max-w-screen-2xl flex-col gap-4 p-4">
    <Breadcrumb :pt="{ root: 'p-0' }" :home="{ label: 'Home', url: '/' }" :model="[{ label: 'Products', url: '/products' }, { label: product?.product_name }]" />

    <Card :pt="{ root: 'rounded-none' }">
      <template #content>
        <div class="flex flex-col justify-center gap-8 lg:flex-row">
          <div class="w-full shrink-0 lg:max-w-lg">
            <Galleria :value="product?.images" :num-visible="5">
              <template #item="{ item }">
                <Image :src="item" preview />
              </template>
              <template #thumbnail="{ item }">
                <img class="max-h-16 border border-gray-200" :src="item">
              </template>
            </Galleria>
          </div>
          <div class="grow">
            <h1 class="text-3xl font-medium">
              {{ product?.product_name }}
            </h1>
            <p class="mt-2 text-muted-color">
              Part number: {{ product?.part_number }}
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
          </div>
        </div>
      </template>
    </Card>

    <Card :pt="{ root: 'rounded-none', content: 'flex flex-col gap-8' }">
      <template #content>
        <div>
          <h2 class="text-2xl font-medium">
            Compatibility Information
          </h2>
          <div class="detailed-table mt-2" v-html="product.compatibility" />
        </div>

        <div>
          <h2 class="text-2xl font-medium">
            Technical Specifications
          </h2>
          <div class="detailed-table mt-2" v-html="product.technical_specifications" />
        </div>
      </template>
    </Card>
  </div>
</template>

<style>
.detailed-table > table {
  @apply table-auto w-full border
}

.detailed-table > table td {
  @apply px-4 py-3 border
}

.detailed-table > table tr td:first-child {
  @apply font-medium
}
</style>
