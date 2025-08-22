// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }, 
  modules: [
    '@pinia/nuxt',
  ],
  ssr: false,
  app: {
    baseURL: '/dice-game/',
    buildAssetsDir: '/_nuxt/',
    pageTransition: { name: 'page', mode: 'out-in' }
  }
})