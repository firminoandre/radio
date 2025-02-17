<script setup lang="ts">
  interface UInputProps {
    modelValue: string
    placeholder: string
  }

  const model = defineModel()
  defineProps<UInputProps>()
</script>

<template>
  <input
    v-model="model"
    type="text"
    :placeholder="placeholder"
    class="w-full bg-gray-800 border-2 border-gray-700 rounded-full py-2 px-4 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition duration-300"
  />
</template>
