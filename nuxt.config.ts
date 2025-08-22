// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }, 
  modules: [
    '@pinia/nuxt',
  ],
  app: {
    baseURL: '/dice-game/',
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})