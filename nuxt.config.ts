import { definePreset } from '@primevue/themes'
import Aura from '@primevue/themes/aura'
import tailwindConfig from './tailwind.config'

const preset = definePreset(Aura, {
  semantic: {
    primary: tailwindConfig.theme.extend.colors.primary,
    colorScheme: {
      light: {
        primary: {
          color: '{primary.700}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.800}',
          activeColor: '{primary.900}',
        },
        secondary: {
          color: '{secondary.800}',
          contrastColor: '#ffffff',
          hoverColor: '{secondary.900}',
          activeColor: '{secondary.950}',
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
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
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
          darkModeSelector: 'none',
        },
      },
    },
  },
})
