<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
    const route = useRoute()
    interface IEventsItemTable extends IEventsItem {
        creationDate: string
    }
    const dateCleaner = (array): void => {
        array.map((elem) => {
            elem.creationDate = new Date(elem.creationTime).toDateString()
            elem.creationTime = dateFormatter(elem.creationTime)
    }) 
    }


    const category = ref<ICategoryItem>(null)
    const events = ref<IEventsItemTable[]>(null)
    const isLoading = ref(false)
    const isLoadingCategoryUpload = ref(false)

    const showCategoryUpdateByUpload = ref(false)
    const categoryName = ref('')
    const categoryFile = ref(null)
    
    const showCategoryErrors = ref(false)
    const categoryError = ref('')

    const showCategoryWarnings = ref(false)
    const categoryWarnings = ref<string[]>(null)
    

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
            categoryFile.value = null
            // document.getElementById("categoryUploadForm").reset()
            showCategoryUpdateByUpload.value = false
            break

        default:
            break
        }

    }

    const updateCategoryByUpload = async () => {
        const formCategory = new FormData()
        formCategory.append('name', category.value.name)
        formCategory.append('spreadsheet', categoryFile.value.files[0])

        isLoadingCategoryUpload.value = true
        const { data: response, pending} = await useAsyncData( () => $fetch<ICategoryResponse>(`/api/v2/Category`, { method: 'put', body: formCategory}).catch((error) => error.data), {initialCache: false})
        
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
    
    onMounted(async () => {
        isLoading.value = true
        const response = await useFetch(`/api/v2/Category/${route.params.categoryName}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
        category.value = response.data.value['category']
        events.value = response.data.value['events']
        dateCleaner(events.value)
        isLoading.value = false
    })
</script>

<template>
    <div v-if="!isLoading && category" class="bg-white p-12 rounded-md w-full">
        <h1 class="text-3xl pb-3">{{category.name}}</h1>
        <div class="flex justify-between pt-2 pb-8">
            <div>
                <p class="pb-1"><span class="font-bold">Filename: </span><span>{{category.filename}}</span></p>
                <div class="flex space-x-10">
                    <div>
                        <p class="pb-1"><span class="font-bold">Created by: </span><span>{{category.userCreation}}</span></p>
                        <p><span class="font-bold">Created on: </span><span>{{category.creationTime}}</span></p>
                    </div>
                    <div>        
                        <p class="pb-1"><span class="font-bold">Last update by: </span><span>{{category.userUpdate}}</span></p>
                        <p><span class="font-bold">Last update on: </span><span>{{category.modificationTime}}</span></p>
                    </div>
                </div>
            </div>
            <button @click="showCategoryUpdateByUpload = true" class="flex space-x-1 p-2 rounded-md max-h-12 items-center hover:text-white hover:bg-green-500 bg-gray-100 cursor-pointer hover:scale-110 ease-in-out delay-50 duration-500">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M15.8,20H14L12,16.6L10,20H8.2L11.1,15.5L8.2,11H10L12,14.4L14,11H15.8L12.9,15.5L15.8,20M13,9V3.5L18.5,9H13Z" />
                </svg>
                <span>Update Category</span>
            </button>
        </div>
            
        <div class="p-4 shadow bg-gray-50">
            <h2 class="text-xl font-bold pt-2">Events History</h2>
            <EventsTable :events="events"></EventsTable>
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

        <Modal :title="'Upload Category'" :onShow="showCategoryUpdateByUpload" @close-on-show="closeModal('upload')">

            <form @submit.prevent="updateCategoryByUpload" class="w-full max-w-sm" id="categoryUploadForm">
            <div class="flex items-center mb-6">
                <div class="w-1/3">
                <label class="block text-gray-500 font-bold text-right mb-0 pr-2">
                    Name
                </label>
                </div>
                <div class="w-2/3">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-900" 
                    label="Category Name" type="text" name="categoryName" id="categoryName" :value="category.name" disabled >
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
    <div v-else>
        <h1>Loading...</h1>
    </div>
</template>
