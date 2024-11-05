<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
  },
  {
    label: 'Features',
  },
  {
    label: 'Products',
    items: [
      {
        label: 'Accessories',
        items: [
          { label: 'EKG/ECG' },
          { label: 'SPO2' },
          { label: 'NIBP' },
          { label: 'Temp Probes' },
          { label: 'O2 Sensor' },
          { label: 'Fetal Transducer' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { label: 'Technical Solutions' },
      { label: 'CMMS' },
      { label: 'RTLS' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About us' },
      { label: 'Careers' },
      { label: 'Contact' },
    ],
  },
])

const visible = ref(false)

const cart = useCartStore()
</script>

<template>
  <div>
    <div class="bg-primary-700 sticky top-0 z-[1000]">
      <ClientOnly>
        <Menubar
          :pt="{
            root: 'border-0 rounded-none bg-primary-700',
            rootList: 'bg-primary-700 border-0',

            itemContent: 'rounded-none',

            submenu: 'bg-primary-700 border-primary-800',
          }" :model="items"
        >
          <template #start>
            <img class="w-32" src="/img/logo.png">
          </template>
          <template #buttonicon="{ toggleCallback }">
            <Button class="text-white !size-12 shrink-0" @click="toggleCallback">
              <template #icon>
                <Icon class="text-3xl" name="tabler:menu-2" />
              </template>
            </Button>
          </template>

          <template #end>
            <div class="flex gap-2">
              <Button class="text-white !size-12 shrink-0" @click="visible = true">
                <template #icon>
                  <Icon class="text-3xl" name="tabler:shopping-cart-filled" />
                </template>
              </Button>
            </div>
          </template>
        </Menubar>
      </ClientOnly>

      <Drawer v-model:visible="visible" position="right" header="Cart" class="w-96">
        <DataView :value="cart.cart">
          <template #list="{ items }">
            <div class="flex flex-col gap-2">
              <div v-for="({ product, quantity }, index) in items" class="flex gap-4">
                <img :src="product.data.images[0]" class="w-24 object-contain" :alt="`Image for ${product.data.product_name}`">
                <div>
                  <h2 class="text-lg font-medium">
                    {{ product.data.product_name }}
                  </h2>
                  <p class="text-muted-color">
                    {{ product.data.part_number }}
                  </p>

                  {{ quantity }}
                </div>
              </div>
            </div>
          </template>
        </DataView>

        <template #footer>
          <Button label="Checkout" class="w-full" />
        </template>
      </Drawer>
    </div>
    <NuxtPage />
    <ScrollTop v-show="!visible" />
    <Toast />
  </div>
</template>
