export default defineEventHandler((event) => {
    const token = event.req.headers.authorization as string
    const access_token = getCookie(event, 'access_token')
    return $fetch('http://localhost:5000/User', { headers: { Authorization: `Bearer ${access_token}`}})
})