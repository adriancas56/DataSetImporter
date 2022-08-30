import {useAuthStore} from '~/stores/authStore'
export default defineEventHandler((event) => {

    const authStore = useAuthStore()
    console.log(!localStorage.getItem('access_token'))
    console.log(authStore.getToken)
    console.log(3425)

    const request = getRequestHeaders(event)
    const token: string = request['Authorization' ]
    return $fetch('http://localhost:5000/Categories', { headers: { Authorization: token} })
})