<script setup>
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

const cart = useCookie('cart', { default: () => [] })
</script>

<template>
  <div class="bg-primary-700 sticky top-0 z-[1000]">
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
        <Button class="text-white !size-12 shrink-0" @click="visible = true">
          <template #icon>
            <Icon class="text-3xl" name="tabler:shopping-cart-filled" />
          </template>
        </Button>
      </template>
    </Menubar>

    <Drawer v-model:visible="visible" position="right" header="Cart">
      <ScrollPanel>
        <div class="grid grid-cols-1 gap-2 p-4">
          <Card v-for="product in cart" :key="product.id" class="border" :pt="{ header: 'brightness-50 rounded-2xl' }">
            <template #header>
              <img :src="product.data.images[0]">
            </template>
            <template #title>
              {{ product.data.product_name }}
            </template>
            <template #footer>
              <Button label="Remove" class="w-full" @click="cart.splice(cart.indexOf(product), 1)" />
            </template>
          </Card>
        </div>
      </ScrollPanel>

      <template #footer>
        <Button label="Checkout" class="w-full" />
      </template>
    </Drawer>
  </div>
  <NuxtPage />
  <ScrollTop />
  <Toast position="top-left" group="tl" />
</template>
