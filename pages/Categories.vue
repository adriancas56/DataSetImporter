<script setup lang="ts">
    console.log('Categories: ', useCookie('access_token').value)
    // const { data, pending, error, refresh } = await useFetch('/api/Categories', {headers: {Authorization: `Bearer ${useCookie('access_token').value}`}})
    const result = await apiFetch('/api/Categories', { headers: { Authorization: `Bearer ${useCookie('access_token').value}`}})
    console.log(result)

</script>


<template>
    <div>
        {{result}}
    </div>
</template>


<style>

</style>
