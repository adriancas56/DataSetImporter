<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
import { IUser } from '~~/types/IUser'

import { useUserStore} from '@/stores/userStore'

const userStore = useUserStore()
const token = useCookie('access_token').value
const { data: userData } = await useFetch('/api/User', { headers: { Authorization: `Bearer ${token}` } })
userStore.setUser(userData)
const userStuff2 = userStore.getUser

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
    const token = useCookie('access_token').value
    const { data: userData } = await useFetch('/api/User', { headers: { Authorization: `Bearer ${token}` } })
    userStore.setUser(userData)
    user.email = userData.value['email']
    titleName.value = userData.value['firstName']
    user.firstName = userData.value['firstName']
    user.lastName = userData.value['lastName']
    user.role = userData.value['role']
    
}

getUserData()
const userStuff = ref(userStore.getUser).value
const makeFormEditable = () => isEditable.value = true
const makeFormNonEditable = () => isEditable.value = false

const updateUser = async () => {
    await useFetch('/api/User', { method: 'put', body: user })
    await getUserData()
    makeFormNonEditable()
}

const registerUser = () => {
    navigateTo('user/register')
}
</script>

<template>
    <div>
        <h1>Welcome {{titleName}}</h1>
        <form @submit.prevent="updateUser">
            <BaseInput v-model="user.firstName" label="First Name" type="text" name="firstName" id="firstName" :disabled="!isEditable"/>
            <BaseInput v-model="user.lastName" label="Last Name" type="text" name="lastName" id="lastName" :disabled="!isEditable"/>
            <BaseInput v-model="user.email" label="Email Address" type="email" name="email" id="email" :disabled="!isEditable"/>
            <!-- <BaseInput v-model="user.password" label="Password" type="password" name="password" id="password" :disabled="!isEditable"/> -->
            <button v-if="isEditable" type="submit">
                Update
            </button>
            <button v-if="isEditable" type="button" @click="makeFormNonEditable">Cancel</button>
            <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
            type="button" @click="makeFormEditable" v-if="!isEditable">
                Want to edit your data?
            </button>
        </form>
        <button class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" 
            type="button" @click="registerUser" v-if="user.role == 1">
            Add a User
        </button>
        {{userStuff2}}
    </div>
</template>