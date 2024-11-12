<script setup lang="ts">
const route = useRoute()
const { data: product } = await useFetch(`/api/products/${route.params.id}`)

// Convert snake case to title case
function toTitleCase(str: string) {
  return str.replace(/_/g, ' ').replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
}

const compatibilitySpecs = 'manufacturer' in product.value?.data.compatibility ? Object.entries(product.value?.data.compatibility).map(([name, value]) => ({ name: toTitleCase(name), value })).slice(1) : undefined
const technicalSpecs = Object.entries(product.value.data.technical_specifications).map(([name, value]) => ({ name: toTitleCase(name), value }))
const quantity = ref(1)
const { addToCart } = useCartStore()
</script>

<template>
  <ClientOnly>
    <div class="mx-auto flex max-w-screen-xl flex-col gap-4 p-4">
      <Breadcrumb :pt="{ root: 'p-0' }" :home="{ label: 'Home', url: '/' }" :model="[{ label: 'Products', url: '/products' }, { label: product?.data.product_name }]" />

      <Card :pt="{ root: 'rounded-none' }">
        <template #content>
          <div class="flex flex-col justify-center gap-8 lg:flex-row">
            <div class="w-full shrink-0 lg:max-w-lg">
              <Galleria :value="product?.data.images" :num-visible="5">
                <template #item="{ item }">
                  <img :src="item">
                </template>
                <template #thumbnail="{ item }">
                  <img class="max-h-16 border border-gray-200" :src="item">
                </template>
              </Galleria>
            </div>
            <div class="grow">
              <h1 class="text-3xl font-medium">
                {{ product?.data.product_name }}
              </h1>
              <p class="mt-2 text-muted-color">
                Part number: {{ product?.data.part_number }}
              </p>
              <!--        TODO: Add category hyperlink -->

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
          <div v-if="compatibilitySpecs">
            <h2 class="text-2xl font-medium">
              Compatibility Information
            </h2>
            <DataTable class="mt-2" :value="compatibilitySpecs">
              <Column header="Manufacturer" field="name" />
              <Column header="Model" field="value" />
            </DataTable>
          </div>

          <div>
            <h2 class="text-2xl font-medium">
              Technical Specifications
            </h2>
            <DataTable class="mt-2" :value="technicalSpecs">
              <Column header="Type" field="name" />
              <Column header="Description" field="value" />
            </DataTable>
          </div>
        </template>
      </Card>
    </div>
  </ClientOnly>
</template>
