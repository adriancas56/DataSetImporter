<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue'
definePageMeta({
    title: "Events History"
})


const dateCleaner = (array): void => {
    array.map((elem) => {
        elem.creationDate = new Date(elem.creationTime).toDateString()
        elem.creationTime = dateFormatter(elem.creationTime)
  }) 
}


const page = ref(1)
const limit = ref(12)
const events = ref(null)
const expand = ref({})

const getEventsData = async () => {
    const { data, pending, error } = await useFetch<IEventsItem[]>(`/api/v2/Events/${page.value}/${limit.value}`, { initialCache: false })
    data.value.forEach((x) => expand.value[x._id] = false)
    events.value = data.value
    dateCleaner(events.value)
}

const expandItem = (id: string) => {
    expand.value[id] = !expand.value[id]
}


const onExpandItems = (isExpansion: boolean) => {
    if (isExpansion) {
        for (const key in expand.value) { expand.value[key] = true }
    } else {
        for (const key in expand.value) { expand.value[key] = false }
    }
}

getEventsData()

</script>


<template>
    <div class="bg-white p-8 rounded-md w-full">
        <div class="flex justify-end gap-x-4 pb-3">
            <button @click="onExpandItems(true)" class="bg-gray-900 text-white text-sm rounded py-1 px-2 hover:bg-gray-500" >Expand All</button>
            <button @click="onExpandItems(false)" class="bg-gray-900 text-white text-sm rounded py-1 px-2 hover:bg-gray-500">Close All</button>
        </div>
        
        <div class="grid grid-cols-12 gap-x-2 gap-y-0 border-b-2 border-gray-200 text-left text-xs font-bold text-gray-700 uppercase">
            <div class="px-2 py-3 col-span-5">Spreadsheet</div>
            <div class="py-3 col-span-2">Execution Date</div>
            <div class="py-3 col-span-1">Result</div>
            <div class="py-3 col-span-3">Category Name</div>
            <div class="text-center py-3 col-span-1">Details</div>
        </div>

        <template v-for="event in events" :key="event._id">
            <div @click="expandItem(event._id)" class="grid grid-cols-12 gap-x-2 gap-y-0 bg-white border-b border-gray-200 text-sm text-gray-900 whitespace-no-wrap hover:bg-gray-100">
                <div class="px-2 py-3 col-span-5 cursor-pointer">
                    <p>{{event.filename}}</p>
                </div>
                <div class="py-3 col-span-2">
                    <p>{{event.creationDate}}</p>
                </div>
                <div class="py-2 col-span-1">
                    <p class="bg-green-500 max-w-fit p-1 rounded-full text-white"
                    :class="{'bg-gray-900': event.executionType == 'update', 'bg-red-500': event.executionType == 'error'}"
                    >{{event.executionType}}</p>
                </div>
                <div class="pt-3 col-span-3">
                    <p>{{event.categoryName}}</p>
                </div>
                <div class="text-center py-1 col-span-1">
                    <button class="hover:bg-white p-1 rounded-full" :class="{'rotate-180': expand[event._id]}">
                        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                        </svg>
                    </button>
                </div>

                <div v-if="expand[event._id]" class="col-span-full px-6 pb-2">
                    <div class="flex justify-between">
                        <div>
                            <p>
                                <span class="text-xs font-bold text-gray-700 uppercase">User: </span>
                                <span>{{event.username}}</span>
                            </p>
                            <p>
                                <span class="text-xs font-bold text-gray-700 uppercase">Time: </span>
                                <span>{{event.creationTime}}</span>
                            </p>
                        </div>
                        <div class="flex items-center">
                            <a :href="`http://localhost:5000/Category/File/${event._id}`" download class="bg-green-500 text-white rounded py-1 px-2 hover:bg-gray-500">
                                Download Spreadsheet
                            </a>
                        </div>
                    </div>
                    <div v-if="event.executionType != 'error'" >
                            <div v-if="event.warnings.length > 0" >
                                <span class="text-xs font-bold text-gray-700 uppercase">Warnings:</span>
                                <div >
                                    <ul class="px-5 list-disc">
                                        <li v-for="warning in event.warnings">{{warning}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div v-else >
                            <span class="text-xs font-bold text-gray-700 uppercase">Error: </span>
                            <span>{{event.error}}</span>
                        </div>
                </div>

            </div>
        </template>
    </div>
</template>



