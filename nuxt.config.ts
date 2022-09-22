import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  
  ssr: false,
  target: 'server',
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
 tailwindcss: {
  cssPath: '~/assets/css/tailwind.css',
  configPath: 'tailwind.config.js',
  exposeConfig: false,
  injectPosition: 0,
  viewer: true,
},
colorMode: {
 classSuffix: ''
},
  vite: { server: { proxy: { '/importer-api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/importer-api/, '')
  },} } } 
})