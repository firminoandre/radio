<script setup lang="ts">
  interface URangeSelectorProps {
    min: string
    max: string
    step: string
  }

  interface URangeSelectorEmits {
    (event: 'input', eventValue: unknown): void
  }

  defineProps<URangeSelectorProps>()
  const emit = defineEmits<URangeSelectorEmits>()

  const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    type="range"
    :min="min"
    :max="max"
    :step="step"
    class="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer mr-2"
    @input="(e) => emit('input', e)"
  />
</template>
