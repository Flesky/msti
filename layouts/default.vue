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
      { label: 'Technical Solutions', url: '/technical-solutions' },
      { label: 'CMMS', url: '/cmms' },
      { label: 'RTLS', url: '/rtls' },
    ],
  },
  {
    label: 'Company',
    items: [
      { label: 'About us', url: '/about' },
      { label: 'Careers', url: '/careers' },
      { label: 'Contact', url: '/contact' },
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
    <div class="sticky top-0 z-[1000] bg-primary-700">
      <ClientOnly>
        <Menubar
          :pt="{
            root: 'border-0 px-4 rounded-none bg-primary-700 max-w-screen-xl mx-auto',
            rootList: 'bg-primary-700 rounded-none border-0',

            itemContent: 'rounded-none',

            submenu: 'bg-primary-700 rounded-none border-primary-800 border-2',
          }" :model="items"
        >
          <template #start>
            <img class="w-32" src="/images/logo.png">
          </template>
          <template #buttonicon="{ toggleCallback }">
            <Button class="!size-10 shrink-0 text-white" @click="toggleCallback">
              <template #icon>
                <Icon class="text-3xl" name="tabler:menu-2" />
              </template>
            </Button>
          </template>

          <template #end>
            <div class="flex gap-2">
              <!-- TODO: Cart badge -->
              <OverlayBadge
                severity="secondary" :value="cart.length ? cart.length : undefined" :pt="!cart.length ? {
                  pcBadge: { root: { style: { background: 'none' } } },
                } : undefined"
              >
                <Button class="!size-10 shrink-0 text-white" @click="visible = true">
                  <template #icon>
                    <Icon class="text-3xl" name="tabler:shopping-cart-filled" />
                  </template>
                </Button>
              </OverlayBadge>
            </div>
          </template>
        </Menubar>
      </ClientOnly>

      <Drawer v-model:visible="visible" position="right" header="Cart" class="w-96">
        <DataView :value="cart">
          <template #list="{ items }">
            <div class="flex flex-col">
              <div v-for="({ product, quantity }, index) in items" class="flex items-start gap-4 py-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index > 0 }">
                <img :src="product.data.images[0]" class="w-24 object-contain pt-2" :alt="`Image for ${product.data.product_name}`">
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
          <div class="p-4">
            <Button
              label="Checkout" class="w-full" @click="navigateTo({
                path: '/contact',
                query: {
                  checkout: true,
                },
              })"
            />
          </div>
        </template>
      </Drawer>
    </div>
    <NuxtPage />
    <ScrollTop v-show="!visible" />
    <Toast position="top-left" />
    <DynamicDialog />

    <footer class="bg-gray-800 p-4 text-center text-white">
      <p>© 2024 Medical Solution Technology Inc.</p>
    </footer>
  </div>
</template>

<style>
.p-overlaybadge .p-badge {
  @apply !outline-none
}
</style>
