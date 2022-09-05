<script setup lang="ts">
    console.log('Categories: ', useCookie('access_token').value)
    // const { data, pending, error, refresh } = await useFetch('/api/Categories', {headers: {Authorization: `Bearer ${useCookie('access_token').value}`}})
    const result = await apiFetch('/api/Categories', { headers: { Authorization: `Bearer ${useCookie('access_token').value}`}})
    // .then(response => {
    //     console.log(response)
    // })
    console.log('refresh', useState('acces_token_cookie').value)


</script>


<template>
    <div>
        {{result}}
    </div>
</template>


<style>

</style>
