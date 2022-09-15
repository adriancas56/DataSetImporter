export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const result = await $fetch(`http://localhost:5000/User`, { method: 'post', body: body })
    console.log(result)
    return result
})