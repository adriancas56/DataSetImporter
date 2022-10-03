<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
    const category = ref()
    const route = useRoute()
    
    const response = await useFetch(`/api/v2/Category/${route.params.categoryName}`)
    category.value = response.data

</script>

<template>
    <div>
        fasdfas
        {{response.data}}
    </div>
</template>
