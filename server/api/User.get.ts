export default defineEventHandler((event) => {
    const access_token = event.req.headers.Authorization as string
    console.log(access_token)
    return $fetch('http://localhost:5000/User', { headers: { Authorization: access_token }})
})