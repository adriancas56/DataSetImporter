<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
const route = useRoute()
    console.log(route.params.categoryName)
    const response = await useFetch(`/api/DiagnosticsCategory?categoryName=${route.params.categoryName}`)

</script>

<template>
    <div>
        {{response}}
    </div>
</template>
