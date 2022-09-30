<script lang="ts" setup>


const page = ref(1)
const limit = ref(6)
const categories = ref<ICategoryItem[]>(null)
const categoriesInDisplay = ref(0)
const categoriesInit = ref(0)
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
  categoriesInit.value = ((page.value - 1) * limit.value) + 1
  categoriesInDisplay.value = categories.value.length + (page.value - 1) * limit.value
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
    <div class="bg-white p-8 mb-4 rounded-2xl">
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
        <div>Displaying {{categoriesInit}} -- {{categoriesInDisplay}} </div>
        <div>In total {{totalCategories}} Categories</div>
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
</template>