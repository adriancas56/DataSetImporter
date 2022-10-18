<script setup lang="ts">
    import { ref, onMounted, onBeforeMount } from 'vue'
const route = useRoute()
    console.log(route.params.categoryName)
    const {data} = await useFetch(`/api/EventsCategory?categoryName=${route.params.categoryName}`, { initialCache: false })

</script>

<template>
    <div>
        {{data}}
    </div>
</template>
