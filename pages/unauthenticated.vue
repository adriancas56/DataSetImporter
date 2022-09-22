<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

definePageMeta({
  layout: 'unauthenticated'
})

const authStore = useAuthStore()
const message = useState('loginMessage')

const userCredentials: {email: string, password: string} = reactive({
    email: '',
    password: ''
})
const login = async () => {
    console.log(userCredentials)
     await useFetch('/importer-api/Login', { initialCache:false, method: 'post', body: userCredentials })
         .then(response => {
             console.log(response)
             console.log(response.error.value)
            console.log(typeof(response.error.value))
            const access_token = useCookie('access_token')
            access_token.value = response.data.value['access_token']
            message.value = null
            navigateTo('/')
        }).catch(error => {
            console.log(error)
        })
}
</script>

<template>

  <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 href="#" class="flex items-center mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        <svg preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" width="2em" height="2em" class="inline-block mr-2 text-lg text-primary-500"><path fill="currentColor" d="M9.078 3.965c-.588 0-1.177.289-1.514.867L.236 17.433c-.672 1.156.17 2.601 1.514 2.601h5.72a1.676 1.676 0 0 1-.35-2.117l5.547-9.513l-2.076-3.572a1.734 1.734 0 0 0-1.513-.867zm7.407 2.922c-.487 0-.973.236-1.252.709L9.17 17.906c-.557.945.138 2.13 1.251 2.13h12.13c1.114 0 1.81-1.185 1.253-2.13l-6.067-10.31a1.437 1.437 0 0 0-1.252-.71z"></path></svg>
           Data Set Importer 
      </h1>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form class="space-y-4 md:space-y-6" @submit.prevent>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input v-model="userCredentials.email" placeholder="Email Address" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="userCredentials.password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  </div>
                  <button type="submit" @click="login" 
                  class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                  Sign in
                  </button>

              </form>
          </div>
      </div>
    <div>{{message}}</div> 
  </div>
</section>
</template>

<style>

</style>