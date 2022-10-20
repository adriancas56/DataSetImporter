<script setup lang="ts">
    import { ref, onMounted} from 'vue'
    definePageMeta({
        title: "Home"
    })

    const categories = ref<ICategoryItem[]>(null)


    const isLoading = ref(false)
    const isLoadingCategoryUpload = ref(false)

    const showCategoryUpload = ref(false)
    const categoryName = ref('')
    const categoryDesc = ref('')
    const categoryFile = ref(null)
    
    const showCategoryErrors = ref(false)
    const categoryError = ref('')

    const showCategoryWarnings = ref(false)
    const categoryWarnings = ref<string[]>(null)
    
    const getCategoriesData = async() => {
        const { data } = await useFetch<ICategoryItem[]>('/api/v2/Categories/latest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
        
        data.value.map((category: ICategoryItem) => {
            category.creationTime = dateFormatter(category.creationTime)
            category.modificationTime = dateFormatter(category.modificationTime)
        })
        categories.value = data.value
    }


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
        if (response.value.warnings) {
            categoryWarnings.value = response.value.warnings
            showCategoryWarnings.value= true
        }
        closeModal('upload')
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

        default:
            break
        }

    }

    onMounted(() => {
        getCategoriesData()
    })
</script>
    
<template>
    <div class="bg-white p-8 mb-4 rounded-2xl">
        <h1 class="text-3xl">Welcome</h1>
        <div class="flex space-x-4 py-6 items-center">
            <p>Want to create a new category? </p>
            <div>
                <button @click="showCategoryUpload = true" class="flex space-x-1 p-2 rounded-md  tracking-wide hover:text-white hover:bg-green-500 bg-gray-100 cursor-pointer hover:scale-110 ease-in-out delay-50 duration-500">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M15.8,20H14L12,16.6L10,20H8.2L11.1,15.5L8.2,11H10L12,14.4L14,11H15.8L12.9,15.5L15.8,20M13,9V3.5L18.5,9H13Z" />
                    </svg>
                    <span>Create Category</span>
                </button>
            </div>
        </div>
        <div class="p-4 bg-gray-50 shadow">
            <p class="text-xl">Latest Category Uploads</p>
            <div class="py-3 grid grid-cols-3 gap-12">
                <CategoryCard v-for="categoryItem in categories" :key="categoryItem._id" :category="categoryItem"/>
            </div>
        </div>



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

<style></style>
