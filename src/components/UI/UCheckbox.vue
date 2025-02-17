<script setup lang="ts">
  interface UCheckboxProps {
    value: unknown
  }

  defineProps<UCheckboxProps>()
  const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    :value="value"
    type="checkbox"
    class="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-offset-gray-800"
  />
</template>
