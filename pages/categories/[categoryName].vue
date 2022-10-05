<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
    const category = ref()
    const route = useRoute()
    
    const response = await useFetch(`/api/v2/Category/${route.params.categoryName}`, { initialCache: false, headers: { Authorization: `Bearer ${useCookie('token').value}` } })
    category.value = response.data
    
</script>

<template>
    <div>
        {{response.data}}
    </div>
</template>
