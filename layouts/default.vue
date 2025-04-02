<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Products',
    // url: '/products',
    items: [
      { label: 'Unimed', url: '/products/unimed' },
      { label: 'Rigel', url: '/products/rigel/' },
    ],
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
const { updateQuantity, removeFromCart } = _cart
</script>

<template>
  <div>
    <div class="sticky top-0 z-[1000] h-[70px] bg-primary-700">
      <Menubar
        :pt="{
          root: 'border-0 px-4 rounded-none bg-primary-700 max-w-screen-2xl mx-auto',
          rootList: 'bg-primary-700 rounded-none border-0',
          start: 'grow md:grow-0',
          button: 'order-2',

          itemContent: 'rounded-none text-white',

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

      <!--   TODO: Change remove text to icon -->
      <!--      Transfer notif to right -->
      <!--      Wishlist functionality -->
      <!--      Product quantity in list -->

      <Drawer v-model:visible="visible" position="right" header="Shopping cart" class="w-96">
        <DataView :value="cart">
          <template #list="{ items }">
            <div class="flex flex-col">
              <div v-for="({ product, quantity }, index) in items" class="flex items-start gap-4 pb-5" :class="{ 'border-t border-surface-200 pt-5 dark:border-surface-700': index > 0 }">
                <img :src="product.images.length ? product.images[0] : ''" class="w-24 object-contain pt-2" :alt="`Image for ${product.product_name}`">
                <div>
                  <h2 class="text-lg font-medium">
                    {{ product.product_name }}
                  </h2>
                  <p class="mt-1 text-muted-color">
                    {{ product.part_number }}
                  </p>

                  <div class="mt-2 flex gap-4">
                    <InputNumber class="mt-2" show-buttons button-layout="horizontal" :min="1" fluid :default-value="quantity" @update:model-value="q => updateQuantity(product.id, q)">
                      <template #incrementbuttonicon>
                        <Icon name="tabler:plus" />
                      </template>
                      <template #decrementbuttonicon>
                        <Icon name="tabler:minus" />
                      </template>
                    </InputNumber>

                    <Button severity="danger" class="mt-1.5" link @click="removeFromCart(product.id)">
                      <template #icon>
                        <Icon class="text-2xl" name="tabler:trash" />
                      </template>
                    </Button>
                  </div>
                </div>
                <!--                <InputNumber :default-value="Number(quantity)" :min="1" /> -->
              </div>
            </div>
          </template>
          <template #empty>
            <div class="space-y-2 p-4 text-center text-muted-color">
              <Icon name="tabler:shopping-cart" class="text-5xl" />
              <p class="text-lg">
                Your cart is empty
              </p>
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
    <div class="bg-gray-100">
      <NuxtPage />
    </div>
    <ScrollTop v-show="!visible" />
    <Toast position="top-right" />
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
