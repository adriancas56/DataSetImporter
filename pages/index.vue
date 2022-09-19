<script setup lang="ts">
const { data: categoriesData } = useFetch('/api/CategoriesLatest', { headers: { Authorization: `Bearer ${useCookie('token').value}` } })

const {data: diagnosticsData} = useFetch('/api/DiagnosticsLatest', { headers: { Authorization: `Bearer ${useCookie('token').value}` } })
</script>

<template>
    <div>
        Hello
        <div>{{categoriesData}}</div>
        <div>{{diagnosticsData}}</div>
    </div>
</template>




<style>

</style>
