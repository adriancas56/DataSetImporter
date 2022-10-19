<script setup lang="ts">
const props = withDefaults(defineProps<{category:ICategoryItem}>(),{})
const hulkeate = ref(false)
const redirectToCategory = () => {
    return navigateTo(`/categories/${props.category.name}`)
}
</script>

<template>
    <div @mouseover="hulkeate = true" @mouseleave="hulkeate = false" @click="redirectToCategory" class="p-8 bg-white rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-110 ease-in-out delay-100 duration-500">      
        <h4 class="pb-2 text-2xl text-gray-900" :class="{'text-green-500': hulkeate}">{{category.name}}</h4>
        <p v-if="category.description"><span class="font-bold">Description: </span><span>{{category.description}}</span></p>
        <p><span class="font-bold">Filename: </span><span>{{category.filename}}</span></p>
        <p><span class="font-bold">Last Update: </span><span>{{category.modificationTime}}</span></p>
    </div>
</template>