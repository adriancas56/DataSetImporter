<script setup lang="ts">
import { useCategoryStore} from '@/stores/categoryStore'
const authStore = useCategoryStore()
console.log(useCookie('token').value)
const {data: categoriesData} = await useFetch('/api/Categories', { headers: { Authorization: `Bearer ${useCookie('token').value}` } })
console.log(useCookie('access_token').value)
authStore.setCategories(categoriesData)
</script>

<template>
    <div>
    <suspense>
        <li v-for="category in authStore.getCategories">
            {{category['name']}}
            <NuxtLink :to="`/diagnostics/${category['name']}`">Diagnostics</NuxtLink>
        </li>
    </suspense>
    </div>
</template>

