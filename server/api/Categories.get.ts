import { useState } from "#app"

export default defineEventHandler((event) => {
    const token = event.req.headers.authorization as string

    return $fetch('http://localhost:5000/Categories', { headers: { Authorization: token},
        async onResponse({ request, response, options }) {

            // Log response
            console.log('[fetch response]', response)
            const access_token = response.headers.get('set-cookie')
            if (access_token){
                // useState('acces_token_cookie', () => access_token)
                // console.log(useState('acces_token_cookie').value)
            }
        }
        })
})