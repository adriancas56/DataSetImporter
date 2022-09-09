export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const access_token = getCookie(event, 'access_token')
    console.log(body)
    const result = await $fetch(`http://localhost:5000/User`, { method: 'put', headers: { Authorization: `Bearer ${access_token}`}, body: body })
    return result
})