export default defineEventHandler((event) => {
    const cookies = parseCookies(event)
    return $fetch('http://localhost:5000/Diagnostics', { headers: { Authorization: `Bearer ${cookies['access_token']}`}})
})