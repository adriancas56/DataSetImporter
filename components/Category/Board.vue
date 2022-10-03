<script setup lang="ts">
const props = defineProps<{
    categories:ICategoryItem[],
    totalCategories: number,
    limit: number,
    page: number,
    categoriesDisplayedStart: number,
    categoriesDisplayedEnd: number
    }>()

const emit = defineEmits<{
    (event: 'display-items-per-page', num: number): void,
    (event: 'next-page'): void,
    (event: 'previous-page'): void
}>()
</script>


<template>
    <div class="bg-white p-8 mb-4 rounded-2xl">
        <h3 class="px-10 text-4xl font-medium text-gray-900">Categories</h3>
        <hr class="mx-10 mt-3 border-gray-400">
        <div>
            <p>
            Categories per page: {{limit}}
            </p>
            <button @click="emit('display-items-per-page', 6)">6</button>
            <button @click="emit('display-items-per-page', 12)">12</button>
            <button @click="emit('display-items-per-page', 24)">24</button>
        </div>
        <div>{{categoriesDisplayedStart}} -{{categoriesDisplayedEnd}} of {{totalCategories}} </div>
        <div class="px-10 py-6 grid grid-cols-3 gap-5">
            
            <CategoryCard v-for="categoryItem in categories" :key="categoryItem._id" :category="categoryItem"/>
        </div>
        <button v-if="page > 1" @click="emit('previous-page')">Previous</button>
        <button v-if="page * limit < totalCategories" @click="emit('next-page')">Next</button>
        <span>Page: {{page}}</span>
    </div>
</template>