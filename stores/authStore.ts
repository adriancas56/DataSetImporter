import { defineStore } from "pinia";


export const useAuthStore = defineStore('authStore', {
    state: () => ({ token: ''}),
    getters: {
      getToken() {
        this.token
      }
    },
    actions: {
      setToken(token) {
        console.log(token)
        console.log('nani')
        this.token = token
        console.log(this.token)
      }
    }
  })