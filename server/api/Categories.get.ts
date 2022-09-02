export default defineEventHandler((event) => {
    const token = event.req.headers.Authorization as string
    console.log("In api")
    return $fetch('http://localhost:5000/Categories', { headers: { Authorization: token} })
})