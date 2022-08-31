<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const { data } = useFetch('/api/Categories', {headers: {Authorization: `Bearer ${useCookie('access_token').value}`}})
// const { data: CategoryData } = useFetch('/api/Category?categoryId=62f6922c91e271ceba927057')

</script>


<template>
 {{data}}
Category 
</template>


<style>

</style>
