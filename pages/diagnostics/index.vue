<script setup lang="ts">
import { useDiagnosticsStore } from '@/stores/diagnosticsStore'
const diagnosticStore = useDiagnosticsStore()
const {data: diagnosticsData} = await useFetch('/api/Diagnostics')
diagnosticStore.setDiagnostics(diagnosticsData)
console.log(diagnosticStore.getDiagnostics)
</script>

<template>
    <div>
    <suspense>
        <li v-for="diagnostic in diagnosticStore.getDiagnostics">
            {{diagnostic}}
        </li>
    </suspense>
    </div>
</template>

