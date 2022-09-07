<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
const categories = ref()
onBeforeMount(async () => {
    const response = await useFetch('/api/Categories', { headers: { Authorization: `Bearer ${useCookie('access_token').value}` } })
    categories.value = response.data
})

</script>


<template>
    <div>
        {{categories}}
    </div>
</template>


<style>

</style>
