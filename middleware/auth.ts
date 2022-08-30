import { useAuthStore } from "~~/stores/authStore"

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const { $config } = useNuxtApp()
  if ($config) {
    console.log('Accessed runtime config within middleware.')
  }
  console.log('Heading to', to.path, 'but I think we should go somewhere else...')
})
