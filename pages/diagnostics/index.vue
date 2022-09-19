<script setup lang="ts">
import { useDiagnosticsStore } from '@/stores/diagnosticsStore'
const diagnosticStore = useDiagnosticsStore()
const {data: diagnosticsData} = await useFetch('/api/Diagnostics')
diagnosticStore.setDiagnostics(diagnosticsData)
console.log(diagnosticStore.getDiagnostics)


const page = ref(1);

const { data: users, pending, refresh: refreshPage, error } = await useFetch(() => `/api/DiagnosticsPage?page=${page.value}&limit=2`);

function previous() {
  page.value--;
  refreshPage();
}

function next() {
  page.value++;
  refreshPage();
}
</script>

<template>
    <div>
    <suspense>
        <li v-for="diagnostic in diagnosticStore.getDiagnostics">
            {{diagnostic}}
        </li>
    </suspense>

        <div>
        {{users}}
        <button @click="next">Next</button>
        <button @click="previous">Previous</button>
    </div>
    </div>
</template>

