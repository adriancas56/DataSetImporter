<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
    foo: { type: Number, required: true },
    bar: Number
})
</script>
<template>
    Category Component
    {{props}}
</template>