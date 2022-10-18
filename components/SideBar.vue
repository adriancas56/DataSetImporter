<script setup lang="ts">

const logout = () => {
    const token = useCookie('access_token')
    token.value = null
    navigateTo('/unauthenticated')
}
</script>

<template>
    <div class="flex flex-col justify-between bg-gray-900 text-blue-100 left-0 top-0 h-screen sticky sidebar ">
        <nav class="py-24">
            <NuxtLink to="/" class="block py-3 px-4 hover:bg-gray-700 hover:text-white flex justify-center tooltip" activeClass="bg-green-500">
                <svg style="width:22px;height:22px" viewBox="0 0 22 22">
                    <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                </svg>
                <span class="tooltiptext">Home</span>
            </NuxtLink>
            <NuxtLink to="/categories" class="block py-3 px-4 hover:bg-gray-700 hover:text-white tooltip" activeClass="bg-green-500">
                <svg style="width:22px;height:22px" viewBox="0 0 22 22">
                    <path fill="currentColor" d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z" />
                </svg>
                <span class="tooltiptext">Categories</span>
            </NuxtLink>
            <NuxtLink to="/events" class="block py-3 px-4 hover:bg-gray-700 hover:text-white tooltip" activeClass="bg-green-500">
                <svg style="width:22px;height:22px" viewBox="0 0 22 22">
                    <path fill="currentColor" d="M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z" />
                </svg>
                <span class="tooltiptext">Events</span>
            </NuxtLink>
        </nav>
        <div class="">
            <NuxtLink to="/user" class="block py-3 px-4 hover:bg-gray-700 hover:text-white tooltip" activeClass="bg-green-500">
                <svg style="width:22px;height:22px" viewBox="0 0 22 22">
                    <path fill="currentColor" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                </svg>
                <span class="tooltiptext">Users</span>
            </NuxtLink>

            <button class="block py-3 px-4 hover:bg-gray-700 hover:text-white tooltip" @click="logout">
                <svg style="width:22px;height:22px" viewBox="0 0 22 22">
                    <path fill="currentColor" d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
                </svg>
                <span class="tooltiptext">Log Out</span>
            </button>
        </div>
    </div>
</template>

<style>
    .sidebar{
        z-index: 50;
    }


    .tooltip {
        position: relative;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 100px;
        background-color: black;
        opacity: 0;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 6px;
        font-size: smaller;

        /* Position the tooltip */
        position: absolute;
        z-index: -1;
        top: 15px;
        left: 135%;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 0.65;
        transition: opacity  1s;
    }
</style>