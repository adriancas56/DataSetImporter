<script setup lang="ts">
const route = useRoute()
const { data: Category } = useFetch(`/api/Category?categoryId=${route.params.id}`)

</script>

<template>
    {{Category}}
    <br>
</template>
