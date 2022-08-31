import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware( (to, from) => {
  const token = (useAuthStore().getToken)
  console.log('hello')
  // return navigateTo('/')

  if (to.path == '/login') {
    console.log('in login')
  }
  else if (!token) {
    return '/login'
  }
  
})
