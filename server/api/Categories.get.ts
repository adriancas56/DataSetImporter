export default defineEventHandler((event) => {
    const token = event.req.headers.authorization as string

    return $fetch('http://localhost:5000/Categories', { headers: { Authorization: token},
        async onResponse({ request, response, options }) {
            // Log response
            console.log('[fetch response]', request, response)
            console.log(response.headers.get('set-cookie'))
        }
        })
})