import { defineStore } from "pinia";


export const useUserStore = defineStore('userStore', {
    state: () => ({ user: {}}),
    getters: {
      getUser: (state) => state.user,
    },
    actions: {
      setUser(user) {
        this.user = user
      }
    }
  })