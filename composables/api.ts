import { $fetch } from 'ohmyfetch'

export const apiFetch = await $fetch.create({ 
    async onResponse({ request, response, options }) {
        console.log('[fetch response]', request, response)
        console.log(response.headers.get('set-cookie'))
     }
   })
