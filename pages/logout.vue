<script setup lang="ts">

const logout = () => {
    const token = useCookie('access_token')
    token.value = null
    navigateTo('/login')
}
</script>

<template>
<button @click="logout">
    Logout
</button>  
</template>


<style>

</style>