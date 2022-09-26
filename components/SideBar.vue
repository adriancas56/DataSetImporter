<script setup lang="ts">
   import MdiHome from '~icons/mdi/home'
   import MdiClipboardText from '~icons/mdi/clipboard-text'
   import MdiFileExcel from '~icons/mdi/file-excel'
   import MdiArchive from '~icons/mdi/archive'
   import MdiAccount from '~icons/mdi/account'
   import MdiLogout from '~icons/mdi/logout'

const logout = () => {
    const token = useCookie('access_token')
    token.value = null
    navigateTo('/unauthenticated')
}
</script>

<template>
    <div class="flex flex-col justify-between bg-gray-900 text-blue-100 left-0 top-0 h-screen sticky ">
        <nav class="py-24">
            <NuxtLink to="/" class="block py-3 px-2.5 hover:bg-gray-700 hover:text-white flex justify-center" activeClass="bg-green-500">
                <MdiHome style="font-size: 24px"/>
            </NuxtLink>
            <NuxtLink to="/categories" class="block py-3 px-2.5 hover:bg-gray-700 hover:text-white " activeClass="bg-green-500">
                <MdiClipboardText style="font-size: 24px"/>
            </NuxtLink>
            <NuxtLink to="/importer" class="block py-3 px-2.5 hover:bg-gray-700 hover:text-white" activeClass="bg-green-500">
                <MdiFileExcel style="font-size: 24px"/>
            </NuxtLink>
            <NuxtLink to="/diagnostics" class="block py-3 px-2.5 hover:bg-gray-700 hover:text-white" activeClass="bg-green-500">
                <MdiArchive style="font-size: 24px"/>
            </NuxtLink>
        </nav>
        <div class="">
            <NuxtLink to="/user" class="block py-3 px-2.5 hover:bg-gray-700 hover:text-white" activeClass="bg-green-500">
                <MdiAccount style="font-size: 24px"/>
            </NuxtLink>

            <NuxtLink to="/user/logout" class="block py-3 px-2.5 hover:bg-gray-700 hover:text-white" @click="logout">
                <MdiLogout style="font-size: 24px"/>
            </NuxtLink>
        </div>
    </div>
</template>