<script setup lang="ts">
    import { ref, onMounted} from 'vue'
    definePageMeta({
        title: "Home"
    })

    const categories = ref<ICategoryItem[]>(null)
    const events = ref<IEventsItem[]>(null)
    
    const getCategoriesData = async() => {
        const { data } = await useFetch<ICategoryItem[]>('/api/v2/Categories/latest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
        
        data.value.map((category: ICategoryItem) => {
            category.creationTime = dateFormatter(category.creationTime)
            category.modificationTime = dateFormatter(category.modificationTime)
        })
        categories.value = data.value
    }

    const getEventsData = async () => {
        const {data} = await useFetch<IEventsItem[]>('/api/v2/Events/latest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
        data.value.map((category: IEventsItem) => {
            category.creationTime = dateFormatter(category.creationTime)
        })
        events.value = data.value
    }

     getCategoriesData()
     getEventsData()
</script>
    
<template>
    <div>
        <div>
            {{events}}
        </div>
        <div class="bg-white p-8 mb-4 rounded-2xl">
            <h3 class="px-10 text-4xl font-medium text-gray-900">Categories</h3>
            <hr class="mx-10 mt-3 border-gray-400">
            <div class="px-10 py-6 grid grid-cols-3 gap-5">
                <CategoryCard v-for="categoryItem in categories" :key="categoryItem._id" :category="categoryItem"/>
            </div>
        </div>
    </div>
</template>

<style></style>
