<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'

definePageMeta({
      title: "Categories"
  })
  
const categories = ref<ICategoryItem[]>(null)
const totalCategories = ref(0)

const page = ref(1)
const limit = ref(12)
const categoriesDisplayedEnd = ref(0)
const categoriesDisplayedStart = ref(0)

const searching = ref(false)
const searchString = ref('')

const watchSearchString = (newSearchString) => {
  if(!newSearchString){
    getCategoriesData()
    searching.value = false
    return
  }
  searchCategory()
}

watch(searchString, watchSearchString)


const categoriesDateCleaner = (categories: ICategoryItem[]): void => {
  categories.map((category: ICategoryItem) => {
    category.creationTime = dateFormatter(category.creationTime)
    category.modificationTime = dateFormatter(category.modificationTime)
  }) 
}

const searchCategory = () => {
  searching.value = true
  page.value = 1
  getSearchCategoriesData()
}


const getDataExecution = () => {
  if (searching.value){ // Modify this statement to handle situations when searchString is empty and you want to change the rows per page
    getSearchCategoriesData()
    return
  }
  getCategoriesData()
}

const previous = () => {
  if (page.value <= 1) return
  page.value--;
  getDataExecution()
}

const next = () => {
  if (totalCategories.value <= limit.value*page.value) return
  page.value++;
  getDataExecution()
}

const displayItemsPerPage = (itemsLimit: number): void => {
  limit.value = itemsLimit
  page.value = 1
  getDataExecution()
}

const settingCategoryValues = (data): void => {
  const categoriesData = data.value['categories_data']
  totalCategories.value = data.value['categories_total']
  categoriesDateCleaner(categoriesData)
  categories.value = categoriesData
  categoriesDisplayedStart.value = ((page.value - 1) * limit.value) + 1
  categoriesDisplayedEnd.value = categories.value.length + (page.value - 1) * limit.value
}

const getCategoriesData = async() => {
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Page/${page.value}/${limit.value}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
  settingCategoryValues(data)
}

const getSearchCategoriesData = async () => {
  const searchQuery = searchString.value
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Search/${searchQuery}/${page.value}/${limit.value}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
  settingCategoryValues(data)
}

onMounted(()=>{
  getCategoriesData()
})
</script>


<template>

    <div class="bg-white p-8 rounded-md w-full">

        <div class="flex items-center pb-4 justify-between">

          <div class="flex bg-gray-100 items-center p-2 rounded-md border-2" :class="{'border-green-500': searching }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <input class="bg-gray-100 outline-none px-2 " v-model="searchString" type="text" name="" id="" placeholder="search...">
          </div>
          
          <div>
            <button class="flex p-2 rounded-md  tracking-wide hover:text-white hover:bg-green-500 bg-gray-100 cursor-pointer">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M15.8,20H14L12,16.6L10,20H8.2L11.1,15.5L8.2,11H10L12,14.4L14,11H15.8L12.9,15.5L15.8,20M13,9V3.5L18.5,9H13Z" />
              </svg>
              <span>Create Category</span>
            </button>
          </div>

        </div>

        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <CategoryTable v-if="categories"
            :categories="categories"
            :totalCategories="totalCategories"
            :limit="limit"
            :page="page"
            :categoriesDisplayedStart="categoriesDisplayedStart"
            :categoriesDisplayedEnd="categoriesDisplayedEnd"
            @display-items-per-page="displayItemsPerPage"
            @next-page="next"
            @previous-page="previous"
          ></CategoryTable>
      </div>
    </div>

</template>

