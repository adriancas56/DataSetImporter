import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware( (to, from) => {
  const token = useCookie('access_token').value
  const isTokenValid: boolean = validateTokenExp(token)

  if (to.path == '/login') {
    return
  }
  else if (!token || token == undefined) {
    useState<string>('loginMessage', () => "Please login to access requested content.")
    return '/login'
  }
  else if (!isTokenValid) {
    useState<string>('loginMessage', () => "Your session has expired. Please login again.")
    return '/login'
  }
  
})
