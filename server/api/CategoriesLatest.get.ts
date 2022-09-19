export default defineEventHandler((event) => {
    const cookies = parseCookies(event)
    return $fetch('http://localhost:5000/Categories/latest', { headers: { Authorization: `Bearer ${cookies['access_token']}`}})
})