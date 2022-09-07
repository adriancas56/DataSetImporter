<script setup lang="ts">
import { reactive } from 'vue'
import { IUserRegistration } from '~~/types/IUserRegistration';

const userData: IUserRegistration = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
})

const registerUser = async () => {
    const { data, error } = await useFetch('/api/Users', { method: 'post', body: userData })
    console.log(data, error)
}

</script>

<template>
    <form @submit.prevent="registerUser">
        <BaseInput v-model="userData.firstName" label="First Name" type="text" name="firstName" id="firstName"/>
        <BaseInput v-model="userData.lastName" label="Last Name" type="text" name="lastName" id="lastName"/>
        <BaseInput v-model="userData.email" label="Email Address" type="email" name="email" id="email"/>
        <BaseInput v-model="userData.password" label="Password" type="password" name="password" id="password"/>
        <button class="p-5 bg-blue-500 text-white rounded-sm mt-5 " type="submit">
            Register
        </button>
    </form>

</template>