<script setup lang="ts">
    definePageMeta({
        title: "Home"
    })
    const { data: categories } = await useFetch('/api/CategoriesLatest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
    
    const {data: diagnostics} = await useFetch('/api/DiagnosticsLatest', { initialCache: false, headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
</script>
    
<template>
    <div>

        <div class="bg-white p-8 mb-4 rounded-2xl">
            <h3 class="px-10 text-4xl font-medium text-gray-900">Categories</h3>
            <hr class="mx-10 mt-3 border-gray-400">
            <div class="px-10 py-6 grid grid-cols-3  gap-5">
                <div v-for="category in categories" :key="category['_id']" class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                    <NuxtLink :to="`/categories/${category['name']}`">
                        <h4 class="mb-2 text-xl tracking-tight text-gray-900 font-bold ">{{category['name']}}</h4>
                        <p>Description: {{category['description']}}</p>
                        <p>Filename: {{category['filename']}}</p>
                        <p>User: {{category['username']}}</p>
                        <p>Creation: {{category['creationTime']['$date']}}</p>
                        <p>Last Update: {{category['modificationTime']['$date']}}</p>
                    </NuxtLink>
                </div>
            </div>
        </div>

    </div>
</template>

<style></style>
