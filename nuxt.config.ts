import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'

const preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fef6ee',
      100: '#fcead8',
      200: '#f8d1b0',
      300: '#f2b07f',
      400: '#ec854b',
      500: '#e86527',
      600: '#d94c1d',
      700: '#b4391a',
      800: '#902f1c',
      900: '#74291a',
      950: '#3e130c',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{primary.700}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.900}',
        },
        navigation: {
          item: {
            focusBackground: '{primary.800}',
            activeBackground: '{primary.900}',
            color: '#fff',
            focusColor: '#fff',
            activeColor: '#fff',
            // icon: {
            //   color: '{surface.500}',
            //   focusColor: '{surface.400}',
            //   activeColor: '{surface.400}',
            // },
          },
          submenuIcon: {
            color: '{surface.200}',
            focusColor: '{surface.200}',
            activeColor: '{surface.200}',
          },
        },
      },
    },
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@nuxt/icon', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt', 'nuxt-swiper'],

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  primevue: {
    options: {
      theme: {
        preset,
        options: {
          cssLayer: {
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities',
          },
        },
      },
    },
  },
})
