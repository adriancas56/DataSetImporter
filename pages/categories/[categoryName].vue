<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
    const category = ref()
    const route = useRoute()
    console.log(route.params.categoryName)
    const response = await useFetch(`/api/v2/Category/${route.params.categoryName}`)
    onBeforeMount(async () => {
        category.value = response.data
    })
</script>

<template>
    <div>
        {{response.data}}
    </div>
</template>
