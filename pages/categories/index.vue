<script setup lang="ts">
import { useCategoryStore} from '@/stores/categoryStore'
const authStore = useCategoryStore()
console.log(useCookie('token').value)
const {data: categoriesData} = await useFetch('/api/Categories', { headers: { Authorization: `Bearer ${useCookie('token').value}` } })
console.log(useCookie('access_token').value)
authStore.setCategories(categoriesData)

const page = ref(1);

const { data: users, pending, refresh: refreshPage, error } = await useFetch(() => `/api/CategoriesPage?page=${page.value}&limit=6`);

function previous() {
  page.value--;
  refreshPage();
}

function next() {
  page.value++;
  refreshPage();
}
</script>

<template>
    <div class="h-fit ">
      <suspense>
          <li v-for="category in authStore.getCategories">
              {{category['name']}}
              <NuxtLink :to="`/diagnostics/${category['name']}`">Diagnostics</NuxtLink>
          </li>
      </suspense>
      <div>
          {{users}}
          <button @click="next">Next</button>
          <button @click="previous">Previous</button>
      </div>
    </div>
</template>

