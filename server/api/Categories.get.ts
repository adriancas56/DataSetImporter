export default defineEventHandler((event) => {
    const token = event.req.headers.authorization as string
    return $fetch('http://localhost:5000/Categories', { headers: { Authorization: token}})
})