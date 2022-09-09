<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { IUser } from '~~/types/IUser'
const user: IUser= reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 0
})

const isEditable = ref<boolean>(false)
const titleName = ref<string>('')
const getUserData = async () => {
    await useFetch('/api/User', { pick: ['firstName', 'lastName', 'email', 'role'] }).then(response => {
        console.log('hello')
        console.log(response)

        user.email = response.data.value['email']
        titleName.value = response.data.value['firstName']
        user.firstName = response.data.value['firstName']
        user.lastName = response.data.value['lastName']
        user.role = response.data.value['role']
    })
    

}
onMounted(async() => {
    await getUserData()
})
const makeFormEditable = () => isEditable.value = true
const makeFormNonEditable = () => isEditable.value = false

const updateUser = async () => {
    await useFetch('/api/User', { method: 'put', body: user })
    await getUserData()
    makeFormNonEditable()
}
</script>

<template>
    <div>
        <h1>Welcome {{titleName}}</h1>
        <form @submit.prevent="updateUser">
            <BaseInput v-model="user.firstName" label="First Name" type="text" name="firstName" id="firstName" :disabled="!isEditable"/>
            <BaseInput v-model="user.lastName" label="Last Name" type="text" name="lastName" id="lastName" :disabled="!isEditable"/>
            <BaseInput v-model="user.email" label="Email Address" type="email" name="email" id="email" :disabled="!isEditable"/>
            <BaseInput v-model="user.password" label="Password" type="password" name="password" id="password" :disabled="!isEditable"/>
            <button v-if="isEditable" type="submit">
                Update
            </button>
            <button v-if="isEditable" type="button" @click="makeFormNonEditable">Cancel</button>
            <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
            type="button" @click="makeFormEditable" v-if="!isEditable">
                Want to edit your data?
            </button>
        </form>
    </div>
</template>