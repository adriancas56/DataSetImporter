export default defineEventHandler((event) => {
    const token = event.req.headers.authorization as string
    return $fetch('http://localhost:5000/Users', { headers: { Authorization: token}})
})