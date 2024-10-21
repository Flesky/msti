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
</script>

<template>
  <div class="bg-primary-700">
    <Drawer v-model:visible="visible" header="Drawer">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </Drawer>

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
        <Button class="text-white !size-10 shrink-0" @click="toggleCallback">
          <template #icon>
            <Icon class="text-2xl" name="tabler:menu-2" />
          </template>
        </Button>
      </template>
    </Menubar>
  </div>
  <NuxtPage />
  <ScrollTop />
</template>
