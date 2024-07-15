// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@bootstrap-vue-next/nuxt', "@nuxt/eslint"],
  css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/scss/style.scss']
})