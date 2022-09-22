import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware( (to, from) => {
  const token = useCookie('access_token').value
  if (to.path == '/unauthenticated') {
    return
  }
  else if (!token) {
    useState<string>('loginMessage', () => "Please login to access requested content.")
    return '/unauthenticated'
  }
  
  const isTokenValid: boolean = validateTokenExp(token)
  if (!isTokenValid) {
    useState<string>('loginMessage', () => "Your session has expired. Please login again.")
    return '/unauthenticated'
  }
  
})
