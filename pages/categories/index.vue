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

const showCategoryUpload = ref(false)

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

const deleteCategory = async (categoryId: string) => {
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/${categoryId}`, { initialCache: false, method: 'delete', headers: { Authorization: `Bearer ${useCookie('token').value}` } })
  console.log(data)
  getDataExecution()
}

const onShowCategoryUpload = () => {
  showCategoryUpload.value = true
}

onMounted(()=>{
  getDataExecution()
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
            <button @click="onShowCategoryUpload" class="flex space-x-1 p-2 rounded-md  tracking-wide hover:text-white hover:bg-green-500 bg-gray-100 cursor-pointer">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M15.8,20H14L12,16.6L10,20H8.2L11.1,15.5L8.2,11H10L12,14.4L14,11H15.8L12.9,15.5L15.8,20M13,9V3.5L18.5,9H13Z" />
              </svg>
              <span>Create Category</span>
            </button>
          </div>

        </div>

        
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
          @delete-category="deleteCategory"
        ></CategoryTable>

        <!-- Button trigger modal -->
        <button type="button"
          class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Launch static backdrop modal
        </button>

        <!-- Modal -->
        <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
          id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
          aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog relative w-auto pointer-events-none">
            <div
              class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div
                class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                  Modal title
                </h5>
                <button type="button"
                  class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body relative p-4">
                ...
              </div>
              <div
                class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button type="button"
                  class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                  data-bs-dismiss="modal">Close</button>
                <button type="button"
                  class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Understood</button>
              </div>
            </div>
          </div>
        </div>


        
    </div>

</template>

