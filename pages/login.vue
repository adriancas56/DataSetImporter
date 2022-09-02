<script setup lang="ts">
import { reactive } from 'vue'
import {useAuthStore} from '@/stores/authStore'

const authStore = useAuthStore()

const userCredentials: {email: string, password: string} = reactive({
    email: '',
    password: ''
})
const login = async () => {
    await useFetch('/api/Login', { method: 'post', body: userCredentials })
        .then(response => {
            const token = useCookie('access_token')
            token.value = response.data.value['access_token']
            console.log(token.value)
            console.log("response token should be here: ", useCookie('access_token').value)
        })
}
</script>

<template>
    <div>

  <h1>Login Page</h1>
  <form @submit.prevent>
        <input v-model="userCredentials.email" placeholder="Email Address" type="email" name="email" id="email">
        <input v-model="userCredentials.password" placeholder="Password" type="password" name="password" id="password">
        <button class="p-5 bg-blue-500 text-white rounded-sm mt-5 " @click="login">
            Login
        </button>
  </form>
        </div>
</template>

<style>

</style>