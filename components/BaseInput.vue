<script setup lang="ts">
export interface Props {
    label?: string,
    modelValue?: string | number
}
const props = withDefaults(defineProps<Props>(), {
    label: '',
    modelValue: ''
})

const emit = defineEmits<{
    (event: 'update:modelValue', targetValue: string): void
}>()

</script>

<template>

    <label>{{label}}</label>
    <input
    :value="modelValue"
    :placeholder="label"
    v-bind="$attrs"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
</template>