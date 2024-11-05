<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Products',
    url: '/products',
  },
  {
    label: 'Solutions',
    items: [
      { label: 'Technical Solutions' },
      { label: 'CMMS' },
      { label: 'RTLS', url: '/rtls' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About us', url: '/about' },
      { label: 'Careers' },
      { label: 'Contact' },
    ],
  },
])

const visible = ref(false)

const _cart = useCartStore()
const { cart } = storeToRefs(_cart)
const { removeFromCart } = _cart
</script>

<template>
  <div>
    <div class="bg-primary-700 sticky top-0 z-[1000]">
      <ClientOnly>
        <Menubar
          :pt="{
            root: 'border-0 rounded-none bg-primary-700 max-w-screen-xl mx-auto',
            rootList: 'bg-primary-700 border-0',

            itemContent: 'rounded-none',

            submenu: 'bg-primary-700 border-primary-800',
          }" :model="items"
        >
          <template #start>
            <img class="w-32" src="/images/logo.png">
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
        <DataView :value="cart">
          <template #list="{ items }">
            <div class="flex flex-col">
              <div v-for="({ product, quantity }, index) in items" class="flex py-4 gap-4 items-start" :class="{ 'border-t border-surface-200 dark:border-surface-700': index > 0 }">
                <img :src="product.data.images[0]" class="w-24 pt-2 object-contain" :alt="`Image for ${product.data.product_name}`">
                <div>
                  <h2 class="text-lg font-medium">
                    {{ product.data.product_name }}
                  </h2>
                  <p class="mt-1 text-muted-color">
                    {{ product.data.part_number }}
                  </p>

                  {{ quantity }}x
                  <Button severity="danger" link @click="removeFromCart(product.id)">
                    Remove
                  </Button>
                </div>
                <!--                <InputNumber :default-value="Number(quantity)" :min="1" /> -->
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
    <Toast position="top-left" />

    <footer class="bg-gray-800 text-white text-center p-4">
      <p>© 2024 Medical Solution Technology Inc.</p>
    </footer>
  </div>
</template>
