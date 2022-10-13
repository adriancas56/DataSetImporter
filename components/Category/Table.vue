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
    (event: 'previous-page'): void,
    (event: 'delete-category', categoryId: string): void
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

    <div class="overflow-x-auto p-4 rounded-lg">
        <table class="w-full tableClass">
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
                        Last User to Update
                    </th>
                    <th class="px-3 py-3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="categoryItem in categories" :key="categoryItem._id" :category="categoryItem" class="bg-white text-sm border-b border-gray-200 text-gray-900 whitespace-no-wrap">
                    <td class="pl-5 py-5 min-w-[16rem]" @click="redirectToCategoryDetails(categoryItem.name)">
                        <p>{{categoryItem.name}}</p>
                    </td>
                    <td class="px-5 py-5" @click="redirectToCategoryDetails(categoryItem.name)">
                        <p>{{categoryItem.creationTime}}</p>
                    </td>
                    <td class="px-5 py-5" @click="redirectToCategoryDetails(categoryItem.name)">
                        <p>{{categoryItem.modificationTime}}</p>
                    </td>
                    <td class="px-5 py-5" @click="redirectToCategoryDetails(categoryItem.name)">
                        <p>{{categoryItem.userUpdate}}</p>
                    </td>
                    <td class="flex space-x-1 justify-end py-2.5 pr-1 ">
                        <button class="hover:bg-white p-2 rounded-full" @click="emit('delete-category', categoryItem._id)">
                            <svg class="text-gray-900 " style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                            </svg>
                        </button>
                        <button class="hover:bg-white p-2 rounded-full" @click="redirectToCategoryDetails(categoryItem.name)">
                            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M10.18 17H7V15H10C10.08 14.32 10.23 13.64 10.5 13H7V11H11.82C11.85 10.97 11.87 10.94 11.9 10.9C13.17 9.64 14.84 9 16.5 9H7V7H17V9H16.5C18.12 9 19.74 9.61 21 10.82V5C21 3.9 20.11 3 19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H13.06C12.65 20.74 12.26 20.45 11.9 20.1C11 19.21 10.45 18.13 10.18 17M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M20.31 17.9C20.75 17.21 21 16.38 21 15.5C21 13 19 11 16.5 11S12 13 12 15.5 14 20 16.5 20C17.37 20 18.19 19.75 18.88 19.32L22 22.39L23.39 21L20.31 17.9M16.5 18C15.12 18 14 16.88 14 15.5S15.12 13 16.5 13 19 14.12 19 15.5 17.88 18 16.5 18Z" />
                            </svg>
                        </button>
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