<script setup lang="ts">
    import { ref, onMounted} from 'vue'
    definePageMeta({
        title: "Home"
    })

    const categories = ref<ICategoryItem[]>(null)
    const diagnostics = ref<IDiagnosticsItem[]>(null)
    
    const getCategoriesData = async() => {
        const { data } = await useFetch<ICategoryItem[]>('/api/v2/Categories/latest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
        
        data.value.map((category: ICategoryItem) => {
            category.creationTime = dateFormatter(category.creationTime)
            category.modificationTime = dateFormatter(category.modificationTime)
        })
        categories.value = data.value
    }

    const getDiagnosticsData = async () => {
        const {data} = await useFetch<IDiagnosticsItem[]>('/api/v2/Diagnostics/latest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
        data.value.map((category: IDiagnosticsItem) => {
            category.creationTime = dateFormatter(category.creationTime)
        })
        diagnostics.value = data.value
    }

    onMounted(async () =>{
     getCategoriesData()
     getDiagnosticsData()
    })
</script>
    
<template>
    <div>
        <div>
            {{diagnostics}}
        </div>
        <div class="bg-white p-8 mb-4 rounded-2xl">
            <h3 class="px-10 text-4xl font-medium text-gray-900">Categories</h3>
            <hr class="mx-10 mt-3 border-gray-400">
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

<style></style>
