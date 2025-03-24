// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  runtimeConfig: {
    strapiURL: process.env.NUXT_STRAPI_URL,
    strapiSecret: process.env.NUXT_STRAPI_SECRET,
    regionId: process.env.NUXT_REGION_ID ? Number(process.env.NUXT_REGION_ID) : 1,
    public: {
      regionId: process.env.NUXT_REGION_ID ? Number(process.env.NUXT_REGION_ID) : 1,
      strapiURL: process.env.NUXT_STRAPI_URL,
    },
  },
  css: [
    '~/assets/css/main.css',
  ],

  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss': {},
      'autoprefixer': {},
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@primevue/nuxt-module', '@nuxt/icon', '@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@vueuse/nuxt', 'nuxt-swiper'],

  primevue: {
    options: {
      theme: 'none',
    },
  },
})
