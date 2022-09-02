import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware( (to, from) => {
  const token = useCookie('access_token').value

  if (to.path == '/login') {
    console.log('in login')
  }
  else if (!token) {
    return '/login'
  }
  
})
