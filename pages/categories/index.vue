<script setup lang="ts">
import { ref, onMounted} from 'vue'
definePageMeta({
      title: "Categories"
  })

const page = ref(1)
const limit = ref(6)
const categories = ref<ICategoryItem[]>(null)
const categoriesDisplayedEnd = ref(0)
const categoriesDisplayedStart = ref(0)

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
  categoriesDisplayedStart.value = ((page.value - 1) * limit.value) + 1
  categoriesDisplayedEnd.value = categories.value.length + (page.value - 1) * limit.value
}

onMounted(()=>{
  getCategoriesData()
})

const searching = ref(false)
const searchString = ref('')
const searchTitle = ref('')
const getSearchCategoryData = async () => {
  searchTitle.value = searchString.value
  const { data, error } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Search/${searchString.value}/${page.value}/${limit.value}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
  const categoriesData = data.value['categories_data']
  totalCategories.value = data.value['categories_total']
  categoriesData.map((category: ICategoryItem) => {
      category.creationTime = dateFormatter(category.creationTime)
      category.modificationTime = dateFormatter(category.modificationTime)
  })
  console.log(categoriesData)
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
  console.log('nani')
  if (totalCategories.value <= limit.value*page.value){
    return
  }
  page.value++;
  getCategoriesData()
}

const displayItemsPerPage = (itemsLimit: number): void => {
  limit.value = itemsLimit
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
      
      <div v-if="searching">
        <h2>Results for {{searchTitle}}</h2>
      </div>

      <CategoryBoard v-if="categories"
        :categories="categories"
        :totalCategories="totalCategories"
        :limit="limit"
        :page="page"
        :categoriesDisplayedStart="categoriesDisplayedStart"
        :categoriesDisplayedEnd="categoriesDisplayedEnd"
        @display-items-per-page="displayItemsPerPage"
        @next-page="next"
        @previous-page="previous"
      ></CategoryBoard>


    </div>
</template>

