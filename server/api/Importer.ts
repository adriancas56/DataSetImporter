export default defineEventHandler(async (event) => {
    const body = await useBody(event)
    const cookies = await parseCookies(event)
    console.log(typeof(body))
    // const response =  await $fetch(`http://localhost:5000/Category`, { method: 'post', body: body, headers: { Authorization: `Bearer ${cookies['access_token']}`, 'Content-Type': 'multipart/form-data'}})
    // console.log(response)
    return 1
})