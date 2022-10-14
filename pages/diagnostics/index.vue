<script setup lang="ts">
import { useDiagnosticsStore } from '@/stores/diagnosticsStore'
import { ref, onMounted, onBeforeMount } from 'vue'
definePageMeta({
    title: "Diagnostics"
})

const onShow = ref(false)
const page = ref(1)
const limit = ref(12)
const events = ref(null)
const getEventsData = async () => {
    const { data, pending, error } = await useFetch(`/api/v2/Diagnostics/${page.value}/${limit.value}`, { initialCache: false })
    events.value = data.value
}

getEventsData()


</script>

<template>
    <div class="bg-white p-8 rounded-md w-full">
                <table class="w-full tableClass">
                    <thead>
                        <tr class="border-b-2 border-gray-200 text-left text-xs font-bold text-gray-700 uppercase">
                            <th class="px-5 py-3">
                                Name
                            </th>
                            <th class="px-5 py-3">
                                Date
                            </th>
                            <th class="px-5 py-3">
                                File
                            </th>
                            <th class="px-5 py-3">
                                Execution Type
                            </th>
                            <th class="px-3 py-3 min-w-[24rem]">
                                Execution Details
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="event in events" :key="event._id">
                            <tr class="bg-white text-sm border-b border-gray-200 text-gray-900 whitespace-no-wrap">
                                <td class="pl-5 py-5">
                                    <p>{{event.categoryName}}</p>
                                </td>
                                <td class="px-5 py-5">
                                    <p>{{event.creationTime}}</p>
                                </td>
                                <td class="px-5 py-5">
                                <p>{{event.filename}}</p>
                                </td>
                                <td class="px-5 py-5">
                                    <p>{{event.executionType}}</p>
                                </td>
                                <td class="px-5 py-5">
                                    <button>
                                        Click Me
                                    </button>
                                    <!-- <div  v-if="event.executionType == 'creation'">
                                        <details class="bg-gray-300 duration-300 rounded-md">
                                            <summary class="bg-inherit px-3 py-2 text-base cursor-pointer">Warnings</summary>
                                            <div class="bg-white px-5 py-3 border border-gray-300 text-sm font-light">
                                                <ul class="pl-2 list-disc">
                                                    <li v-for="warning in event.warnings">{{warning}}</li>
                                                </ul>
                                            </div>
                                        </details>
                                    </div>
                                    <div v-else-if="event.executionType == 'Failed'">
                                        <p>Error</p>
                                    </div> -->
                                </td>
                            </tr>

                            <tr>
                                <td class="overflow">

                                <div class="w-full">
                                    <details class="bg-gray-300 duration-300 rounded-md">
                                        <summary class="bg-inherit px-3 py-2 text-base cursor-pointer">Warnings</summary>
                                        <div class="bg-white px-5 py-3 border border-gray-300 text-sm font-light">
                                            <ul class="pl-2 list-disc">
                                                <li v-for="warning in event.warnings">{{warning}}</li>
                                            </ul>
                                        </div>
                                    </details>
                                </div>
                                </td>

                            </tr>

                        </template>
                    </tbody>
                </table>
    </div>
</template>



