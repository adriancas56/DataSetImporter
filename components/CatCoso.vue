<script setup lang="ts">
    
const props = withDefaults(defineProps<{category:ICategoryItem}>(),{});

</script>

<template>
    <div class="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
        <NuxtLink :to="`/categories/${category.name}`">
            <h4 class="mb-2 text-xl tracking-tight text-gray-900 font-bold hover:text-green-500">{{category.name}}</h4>
        </NuxtLink>
            <p>Description: {{category.description}}</p>
            <p>Filename: {{category.filename}}</p>
            <p>User: {{category.username}}</p>
            <p>Creation: {{category.creationTime}}</p>
            <p>Last Update: {{category.modificationTime}}</p>
    </div>
</template>