import { defineStore } from "pinia";


export const useAuthStore = defineStore('authStore', {
    state: () => ({ token: ''}),
    getters: {
      getToken: (state) => state.token,
    },
    actions: {
      setToken(token) {
        this.token = token
      }
    }
  })