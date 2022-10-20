<script setup lang="ts">
import { debounce } from 'lodash'
import { ref, reactive, onMounted, watch, InputHTMLAttributes } from 'vue'

definePageMeta({
      title: "Categories"
  })
  
const categories = ref<ICategoryItem[]>(null)
const totalCategories = ref(0)

const page = ref(1)
const limit = ref(12)
const categoriesDisplayedEnd = ref(0)
const categoriesDisplayedStart = ref(0)
const isLoadingCategoryData = ref(false)
const errorLoadingCategoriesData = ref(false)

const categoryError = ref('')
const showCategoryErrors = ref(false)

const searching = ref(false)
const searchString = ref('')

const watchSearchString = (newSearchString) => {
  if(!newSearchString){
    getCategoriesData()
    searching.value = false
    return
  }
  searchCategory()
  // const debounceSearchCategory = debounce(searchCategory, 1500)
  // debounceSearchCategory()
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

const getCategoriesData = async () => {
  isLoadingCategoryData.value = true
  const { data, pending, error } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Page/${page.value}/${limit.value}`, { initialCache: false})
  isLoadingCategoryData.value = pending.value

  if (error.value) {
    errorLoadingCategoriesData.value = true
    return
  }

  errorLoadingCategoriesData.value = false
  settingCategoryValues(data)
}

const getSearchCategoriesData = async () => {
  const searchQuery = searchString.value
  isLoadingCategoryData.value = true
  const { data, pending, error } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Search/${searchQuery}/${page.value}/${limit.value}`, { initialCache: false })
  isLoadingCategoryData.value = pending.value
  
  if (error.value) {
    errorLoadingCategoriesData.value = true
    return
  }

  errorLoadingCategoriesData.value = false
  settingCategoryValues(data)
}


const deleteCategoryName = ref('')
const showDeleteCategory = ref(false)
const deleteCategoryData = ref<ICategoryItem>(null)
const isLoadingCategoryDelete = ref(false)
const onShowDeleteCategory = (categoryId: string) => {
  deleteCategoryData.value = categories.value.filter(category => category._id === categoryId)[0]
  deleteCategoryName.value = `Delete ${deleteCategoryData.value.name}`
  showDeleteCategory.value = true
}
const deleteCategory = async () => {
  isLoadingCategoryDelete.value = true
  const { pending, error } = await useFetch<ICategoryResponse>(`/api/v2/Category/${deleteCategoryData.value._id}`, { initialCache: false, method: 'delete' })
  isLoadingCategoryDelete.value = pending.value
  closeModal('delete-category')
  if (error.value) {
    categoryError.value = 'Something went wrong, please try again.'
    showCategoryErrors.value = true
  }
  getDataExecution()
}

const showCategoryUpload = ref(false)
const categoryName = ref('')
const categoryDesc = ref('')
const categoryFile = ref(null)
const categoryWarnings = ref<string[]>(null)

const showCategoryWarnings = ref(false)
const isLoadingCategoryUpload = ref(false)

const uploadCategory = async () => {
  const formCategory = new FormData()
  formCategory.append('name', categoryName.value)
  formCategory.append('description', categoryDesc.value)
  formCategory.append('spreadsheet', categoryFile.value.files[0])

  isLoadingCategoryUpload.value = true
  const { data: response, pending} = await useAsyncData( () => $fetch<ICategoryResponse>(`/api/v2/Category`, { method: 'post', body: formCategory}).catch((error) => error.data), {initialCache: false})
  
  isLoadingCategoryUpload.value = pending.value
  
  if (response.value.statusCode >= 400){
    categoryError.value = response.value.message
    showCategoryErrors.value = true
  }
  if (response.value.warnings.length > 0) {
    categoryWarnings.value = response.value.warnings
    showCategoryWarnings.value= true
  }
  closeModal('upload')
  getDataExecution()
}

const closeModal = (modal: string) => {

  switch (modal) {
    case 'error':
      showCategoryErrors.value = false
      break
    
    case 'warning':
      showCategoryWarnings.value = false 
      break
  
    case 'upload':
      categoryName.value = ''
      categoryDesc.value = ''
      categoryFile.value = null
      // document.getElementById("categoryUploadForm").reset()
      showCategoryUpload.value = false
      break

    case 'delete-category':
      deleteCategoryName.value = ''
      deleteCategoryData.value = null
      showDeleteCategory.value = false
      break

    default:
      break
  }

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
          <button @click="showCategoryUpload = true" class="flex space-x-1 p-2 rounded-md  tracking-wide hover:text-white hover:bg-green-500 bg-gray-100 cursor-pointer hover:scale-110 ease-in-out delay-50 duration-500">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M15.8,20H14L12,16.6L10,20H8.2L11.1,15.5L8.2,11H10L12,14.4L14,11H15.8L12.9,15.5L15.8,20M13,9V3.5L18.5,9H13Z" />
            </svg>
            <span>Create Category</span>
          </button>
        </div>

      </div>
      
      <CategoryTable v-if="categories && !isLoadingCategoryData"
        :categories="categories"
        :totalCategories="totalCategories"
        :limit="limit"
        :page="page"
        :categoriesDisplayedStart="categoriesDisplayedStart"
        :categoriesDisplayedEnd="categoriesDisplayedEnd"
        @display-items-per-page="displayItemsPerPage"
        @next-page="next"
        @previous-page="previous"
        @delete-category="onShowDeleteCategory"
      ></CategoryTable>
      <div v-else-if="errorLoadingCategoriesData" class="bg-red-500 text-white rounded-md py-5 text-center">
        <p class="font-semibold text-lg pb-1">There was an error, please try again.</p>
        <button @click="getDataExecution" class="rounded-md p-1 hover:bg-red-400">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
          </svg>
        </button>
      </div>
      <div v-else class="shadow rounded-md p-4  w-full mx-auto">
        <div class="animate-pulse">
          <div class="h-4 bg-gray-200 mt-3 mb-6 rounded"></div>
          <div class="h-4 bg-gray-300 mb-6 rounded"></div>
          <div class="h-4 bg-gray-200 mb-6 rounded"></div>
          <div class="h-4 bg-gray-300 mb-6 rounded"></div>
          <div class="h-4 bg-gray-200 mb-6 rounded"></div>
        </div>
      </div>
      <!-- <SpinningWheel v-else></SpinningWheel> -->


      <Modal :title="deleteCategoryName" :onShow="showDeleteCategory" @close-on-show="closeModal('delete-category')">
        <p class="text-lg pb-4">
          Are you sure you want to delete this category?
        </p>
        <div class="flex justify-between">
          <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="button" @click="closeModal('delete-category')">Cancel</button>
          <button class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="button" @click="deleteCategory">
            <span v-if="!isLoadingCategoryDelete">
              Delete
            </span>
            <SpinningWheel v-else></SpinningWheel>
          </button>
        </div>
      </Modal>

      <Modal :title="'Error'" :onShow="showCategoryErrors" @close-on-show="closeModal('error')">
        <p class="pb-2">
          {{categoryError}}
        </p>
        <button class="float-right bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition" type="button" @click="closeModal('error')">Understood</button>
      </Modal>

      
      <Modal :title="'Warnings'" :onShow="showCategoryWarnings" @close-on-show="closeModal('warning')">
          <ul class="px-2 list-disc pb-2 space-y-1.5">
            <li v-for="warning in categoryWarnings">
              {{warning}}
            </li>
          </ul>
          <button class="float-right bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="button" @click="closeModal('warning')">Understood</button>
        
      </Modal>
      

      <Modal :title="'Upload Category'" :onShow="showCategoryUpload" @close-on-show="closeModal('upload')">

        <form @submit.prevent="uploadCategory" class="w-full max-w-sm" id="categoryUploadForm">
          <div class="flex items-center mb-6">
            <div class="w-1/3">
              <label class="block text-gray-500 font-bold text-right mb-0 pr-2">
                Name
              </label>
            </div>
            <div class="w-2/3">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900" 
              v-model="categoryName" label="Category Name" type="text" name="categoryName" id="categoryName" required>
            </div>
          </div>

          <div class="flex items-center mb-6">
            <div class="w-1/3">
              <label class="block text-gray-500 font-bold text-right mb-0 pr-2">
                Description
              </label>
            </div>
            <div class="w-2/3">
              <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900" 
              v-model="categoryDesc" label="Category Description" type="text" name="categoryDesc" id="categoryDesc">
            </div>
          </div>

          <div class="flex items-center mb-6">
            <div class="w-1/3">
              <label class="block text-gray-500 font-bold text-right mb-0 pr-2">
                File
              </label>
            </div>
            <div class="w-2/3">
              <input class="file:py-2 file:bg-gray-900 file:text-white file:rounded-md file:hover:bg-gray-500 text-gray-700 bg-gray-200 rounded-md w-full leading-tight" 
              ref="categoryFile" type="file" name="categoryFile" id="categoryFile" required>
            </div>
          </div>

          <div class="flex mitems-center">
            <div class="w-1/3"></div>
            <div class="w-2/3 flex justify-between">
              <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="reset" @click="closeModal('upload')">Cancel</button>
              <button class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="submit">
                <span v-if="!isLoadingCategoryUpload">
                  Upload
                </span>
                <SpinningWheel v-else></SpinningWheel>

              </button>
            </div>
          </div>
        </form>

      </Modal>

      
  </div>
</template>

