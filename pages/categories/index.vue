<script setup lang="ts">
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
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Page/${page.value}/${limit.value}`, { initialCache: false})
  settingCategoryValues(data)
}

const getSearchCategoriesData = async () => {
  const searchQuery = searchString.value
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/Search/${searchQuery}/${page.value}/${limit.value}`, { initialCache: false })
  settingCategoryValues(data)
}


const deleteCategoryName = ref('')
const showDeleteCategory = ref(false)
const deleteCategoryData = ref<ICategoryItem>(null)
const onShowDeleteCategory = (categoryId: string) => {
  deleteCategoryData.value = categories.value.filter(category => category._id === categoryId)[0]
  deleteCategoryName.value = `Delete ${deleteCategoryData.value.name}`
  showDeleteCategory.value = true
}
const deleteCategory = async () => {
  const { data } = await useFetch<ICategoryItem[]>(`/api/v2/Category/${deleteCategoryData.value._id}`, { initialCache: false, method: 'delete' })
  console.log(data)
  closeModal('delete-category')
  getDataExecution()
}

interface ICategoryUpload {
  message: string
  statusCode: number
  warnings: string[]
  error?: string
  id?: string
}
const showCategoryUpload = ref(false)
const categoryName = ref('')
const categoryDesc = ref('')
const categoryFile = ref(null)
const categoryWarnings = ref<string[]>(null)
const categoryError = ref(null)
const showCategoryWarnings = ref(false)
const showCategoryErrors = ref(false)
const uploadCategory = async () => {
  const formCategory = new FormData()
  formCategory.append('name', categoryName.value)
  formCategory.append('description', categoryDesc.value)
  formCategory.append('spreadsheet', categoryFile.value.files[0])

  const response = await $fetch<ICategoryUpload>(`/api/v2/Category`, { method: 'post', body: formCategory}).catch((error) => error.data)
  
  if (response.statusCode >= 400){
    categoryError.value = response.message
    showCategoryErrors.value = true
  }
  if (response.warnings) {
    categoryWarnings.value = response.warnings
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
          <button @click="showCategoryUpload = true" class="flex space-x-1 p-2 rounded-md  tracking-wide hover:text-white hover:bg-green-500 bg-gray-100 cursor-pointer">
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
        @delete-category="onShowDeleteCategory"
      ></CategoryTable>


      <Modal :title="deleteCategoryName" :onShow="showDeleteCategory" @close-on-show="closeModal('delete-category')">
        <p class="text-lg pb-4">
          Are you sure you want to delete this category?
        </p>
        <div class="flex justify-between">
          <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="button" @click="closeModal('delete-category')">Cancel</button>
          <button class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="button" @click="deleteCategory">Delete</button>
        </div>
      </Modal>

      <Modal :title="'Error'" :onShow="showCategoryErrors" @close-on-show="closeModal('error')">
        <p>
          {{categoryError}}
        </p>
        <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition" type="button" @click="closeModal('error')">Understood</button>
      </Modal>

      
      <Modal :title="'Warnings'" :onShow="showCategoryWarnings" @close-on-show="closeModal('warning')">
        <ul>
          <li v-for="warning in categoryWarnings">
            {{warning}}
          </li>
        </ul>
        <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition" type="button" @click="closeModal('warning')">Understood</button>
      </Modal>
      

      <Modal :title="'Upload Category'" :onShow="showCategoryUpload" @close-on-show="closeModal('upload')">
        <form @submit.prevent="uploadCategory">
          <fieldset>
            <legend>Category Information</legend>
            <BaseInput v-model="categoryName" label="Category Name" type="text" name="categoryName" id="categoryName" required/>
            <BaseInput v-model="categoryDesc" label="Category Desc" type="text" name="categoryDesc" id="categoryDesc"/>
            <label for="categoryFile">Category File</label>
            <input ref="categoryFile" type="file" name="categoryFile" id="categoryFile" required>
            <div class="flex justify-between items-center pt-4">
              <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="button" @click="closeModal('upload')">Close</button>
              <button class="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition" type="submit">Upload</button>
            </div>
        </fieldset>
      </form>
      </Modal>

      
  </div>
</template>

