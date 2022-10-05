<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
    categories:ICategoryListItem[],
    totalCategories: number,
    limit: number,
    page: number,
    categoriesDisplayedStart: number,
    categoriesDisplayedEnd: number
    }>()

const emit = defineEmits<{
    (event: 'display-items-per-page', num: number): void,
    (event: 'next-page'): void,
    (event: 'previous-page'): void
}>()
const redirectToCategoryDetails = (categoryName) => {
    return navigateTo(`/categories/${categoryName}`)
}
const selectPageLimit = (event: Event) => {
    const pageLimit = +(event.target as HTMLInputElement).value
    emit('display-items-per-page', pageLimit)
}
const isNext = computed(() => {
  return props.page * props.limit < props.totalCategories ? true : false
})
const isPrev = computed(() => {
  return props.page > 1 ? true : false
})

</script>

<template>
    <div class=" rounded-lg ">
        <table class="min-w-full leading-normal shadow tableClass ">
            <thead>
                <tr class="border-b-2 border-gray-200 text-left text-xs font-bold text-gray-700 uppercase">
                    <th class="px-5 py-3">
                        Name
                    </th>
                    <th class="px-5 py-3">
                        Created at
                    </th>
                    <th class="px-5 py-3">
                        Updated at
                    </th>
                    <th class="px-5 py-3">
                        User
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="categoryItem in categories" :key="categoryItem._id" :category="categoryItem" @click="redirectToCategoryDetails(categoryItem.name)" class="cursor-pointer">
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                        <p class="text-gray-900 whitespace-no-wrap">
                            {{categoryItem.name}}
                        </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                            {{categoryItem.creationTime}}
                        </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                            {{categoryItem.modificationTime}}
                        </p>
                    </td>
                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p class="text-gray-900 whitespace-no-wrap">
                            {{categoryItem.username}}
                        </p>
                        <!-- <span class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                            <span aria-hidden class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                            <span class="relative">Inactive</span>
                        </span> -->
                    </td>
                </tr>
            </tbody>
        </table>


        <div class="flex justify-end pt-4">

            <div class="flex items-center pr-4">
                <span class="text-sm text-gray-900 pr-2">Rows per page:</span>
                <select class="
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    @change="selectPageLimit($event)">
                        <option selected>{{limit}}</option>
                        <option value="6" >6</option>
                        <option value="12">12</option>
                        <option value="24">24</option>
                </select>
            </div>

            <div class="flex items-center">
                <span class="text-sm text-gray-900 pr-3">
                    {{categoriesDisplayedStart}} - {{categoriesDisplayedEnd}} of {{totalCategories}}
                </span>
                <span class="flex items-center">
                    <button @click="emit('previous-page')" class="text-sm transition duration-150 rounded-l text-gray-500 cursor-pointer" :class="{'text-green-500': isPrev, 'hover:bg-gray-100': isPrev, 'cursor-auto': !isPrev}" >
                        <span >
                            <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                            </svg>
                        </span>
                    </button>
                    
                    <button @click="emit('next-page')" class="text-sm transition duration-150 rounded-r text-gray-500 cursor-pointer" :class="{'text-green-500': isNext, 'hover:bg-gray-100': isNext, 'cursor-auto': !isNext}">
                        <span>
                            <svg style="width:30px;height:30px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                            </svg>
                        </span>   
                    </button>
                </span>
            </div>
 
        </div>

    </div>
</template>

<style>
    table.tableClass tr:hover td {
        background-color: #f3f4f6;
        }
</style>