<script setup lang="ts">
export interface Props {
    title: string,
    onShow: boolean
}
const props = withDefaults(defineProps<Props>(), {
    title: '',
    onShow: false
})

const emit = defineEmits<{
    (event: 'close-on-show'): void
}>()

</script>


<template>
    <div class="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal" :class="{'hidden': !onShow}" @keydown.esc="emit('close-on-show')">
        <div class="relative top-40 mx-auto shadow-xl rounded-lg bg-white max-w-lg scroll">
          <div class="flex justify-between items-center bg-gray-900 text-white text-2xl rounded-t-lg px-4 py-4" :class="{'bg-red-500': title == 'Error'}">
              <h3>{{title}}</h3>
          </div>
          <div class="px-6 pt-3 pb-5 max-h-[28rem] overflow-x-hidden">
              <slot />
            </div>
        </div>
    </div>
</template>