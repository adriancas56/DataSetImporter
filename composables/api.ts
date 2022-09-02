import { $fetch } from 'ohmyfetch'

export const apiFetch = await $fetch.create({ 
    baseURL: '/api',
    async onResponse({ request, response, options }) {
        console.log('[fetch response]', request, response)
  
     }
   })
