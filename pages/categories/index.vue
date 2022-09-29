<script setup lang="ts">
import { ref, onMounted} from 'vue'
definePageMeta({
      title: "Categories"
  })


    
const page = ref(1)
const limit = ref(6)
const categories = ref<ICategoryItem[]>(null)
const paginationMessage = ref('')
const categoriesInDisplay = ref(0)

const totalCategories = ref(0)
const getCategoriesData = async() => {
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Page/${page.value}/${limit.value}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
  const categoriesData = data.value['categories_data']
  totalCategories.value = data.value['categories_total']
  categoriesData.map((category: ICategoryItem) => {
      category.creationTime = dateFormatter(category.creationTime)
      category.modificationTime = dateFormatter(category.modificationTime)
  })
  categories.value = categoriesData
  categoriesInDisplay.value = limit.value + (page.value - 1) * limit.value
}

onMounted(()=>{
  getCategoriesData()
})

const searching = ref(false)
const searchString = ref('')
const searchTitle = ref('')
const getSearchCategoryData = async () => {
  searchTitle.value = searchString.value
  const { data, error } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Search/${searchString.value}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
  data.value.map((category: ICategoryItem) => {
      category.creationTime = dateFormatter(category.creationTime)
      category.modificationTime = dateFormatter(category.modificationTime)
  })
  categories.value = data.value
  searchString.value = ''
}

const searchCategory = () => {
  searching.value = true
  getSearchCategoryData()
}

const previous = () => {
  if (page.value <= 1){
    return
  }
  page.value--;
  getCategoriesData()
}

const next = () => {
  if (totalCategories.value <= limit.value*page.value){
    paginationMessage.value = 'You reached the limit of available Categories.'
    return
  }
  page.value++;
  getCategoriesData()
}

const setSixPerPage = () => {
  limit.value = 6
  page.value = 1
  getCategoriesData()
}
const setTwelvePerPage = () => {
  limit.value = 12
  page.value = 1
  getCategoriesData()
}
const setTwentyFourPerPage = () => {
  limit.value = 24
  page.value = 1
  getCategoriesData()
}
</script>

<template>
    <div>


      <div>   
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
          <div class="relative">
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input type="search" id="default-search" v-model="searchString" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required>
              <button @click="searchCategory" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </div>

      <div v-if="!searching" class="bg-white p-8 mb-4 rounded-2xl">
            <h3 class="px-10 text-4xl font-medium text-gray-900">Categories</h3>
            <hr class="mx-10 mt-3 border-gray-400">
            <div>
              <p>
                Categories per page: {{limit}}
              </p>
              <button @click="setSixPerPage">6</button>
              <button @click="setTwelvePerPage">12</button>
              <button @click="setTwentyFourPerPage">24</button>
            </div>
            <div>Displaying {{categoriesInDisplay}} of {{totalCategories}} Categories</div>
            <div class="px-10 py-6 grid grid-cols-3 gap-5">
                <div v-for="category in categories" :key="category._id" class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <NuxtLink :to="`/categories/${category.name}`">
                        <h4 class="mb-2 text-xl tracking-tight text-gray-900 font-bold hover:text-green-500">{{category.name}}</h4>
                    </NuxtLink>
                        <p>Description: {{category.description}}</p>
                        <p>Filename: {{category.filename}}</p>
                        <p>User: {{category.username}}</p>
                        <p>Creation: {{category.creationTime}}</p>
                        <p>Last Update: {{category.modificationTime}}</p>
                </div>
            </div>
            <button v-if="page > 1" @click="previous">Previous</button>
            <button v-if="page * limit < totalCategories" @click="next">Next</button>
            <span>Page: {{page}}</span>
        </div>

        <div v-else class="bg-white p-8 mb-4 rounded-2xl">
          <div><h2>Results for {{searchTitle}}</h2></div>
          <div class="px-10 py-6 grid grid-cols-3 gap-5">
                <div v-for="category in categories" :key="category._id" class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <NuxtLink :to="`/categories/${category.name}`">
                        <h4 class="mb-2 text-xl tracking-tight text-gray-900 font-bold hover:text-green-500">{{category.name}}</h4>
                    </NuxtLink>
                        <p>Description: {{category.description}}</p>
                        <p>Filename: {{category.filename}}</p>
                        <p>User: {{category.username}}</p>
                        <p>Creation: {{category.creationTime}}</p>
                        <p>Last Update: {{category.modificationTime}}</p>
                </div>
            </div>
        </div>



    </div>
</template>

