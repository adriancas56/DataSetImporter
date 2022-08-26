export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const result = await $fetch(`http://localhost:5000/Login`, { method: 'post', body:body })
    return result
})