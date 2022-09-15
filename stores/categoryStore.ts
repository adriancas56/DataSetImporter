import { defineStore } from "pinia";


export const useCategoryStore = defineStore('categoryStore', {
    state: () => ({ categories: []}),
    getters: {
      getCategories: (state) => state.categories,
    },
    actions: {
      setCategories(categories) {
        this.categories = categories
      }
    }
  })