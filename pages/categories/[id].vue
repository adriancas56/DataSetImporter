<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
    const category = ref()
    const route = useRoute()
    const response = await useFetch(`/api/Category?categoryId=${route.params.id}`)
    onBeforeMount(async () => {
        category.value = response.data
    })
</script>

<template>
    <div>
        {{category}}
    </div>
</template>
