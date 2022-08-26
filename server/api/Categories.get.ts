export default defineEventHandler((event) => {
    const request = getRequestHeaders(event)
    const token: string = request['Authorization' ]
    return $fetch('http://localhost:5000/Categories', { headers: { Authorization: token} })
})