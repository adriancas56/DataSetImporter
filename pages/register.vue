<script setup lang="ts">
import { reactive } from 'vue'
import { IUserRegistration } from '~~/types/IUserRegistration';

const userData: IUserRegistration = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
})

const registerUser = () => {
    const { data, error} = useFetch('/api/Users', { method: 'post', body: userData })
    console.log('This is the register page', data.value)
    console.log(error)
}

</script>

<template>
    <form @submit.prevent>
        <input v-model="userData.firstName" placeholder="First Name" type="text" name="firstName" id="firstName">
        <input v-model="userData.lastName" placeholder="Last Name" type="text" name="lastName" id="lastName">
        <input v-model="userData.email" placeholder="Email Address" type="email" name="email" id="email">
        <input v-model="userData.password" placeholder="Password" type="password" name="password" id="password">
        <button class="p-5 bg-blue-500 text-white rounded-sm mt-5 " @click="registerUser">
            Register
        </button>
    </form>

</template>