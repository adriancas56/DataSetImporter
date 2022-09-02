<script setup lang="ts">
    console.log(useCookie('access_token').value)
const { data } = useFetch('/api/Categories', {headers: {Authorization: `Bearer ${useCookie('access_token').value}`}})
// const { data: CategoryData } = useFetch('/api/Category?categoryId=62f6922c91e271ceba927057')
</script>


<template>
    <div>
 {{data}}
Category 

    </div>
</template>


<style>

</style>
