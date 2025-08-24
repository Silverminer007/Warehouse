<template>
  <li class="list-row flex items-center justify-between p-2">
    <div class="flex flex-row items-center gap-2 flex-grow">
      <p class="text-base-content text-xl mx-2 font-semibold">{{ box.name }}</p>
    </div>
    <slot/>
  </li>
</template>

<script lang="ts" setup>
import type {Box} from '@/types/inventory'

defineProps<{
  box: Box
}>();
</script>

<style scoped>
.list-row {
  border-bottom: 1px solid #e5e7eb;
}
</style>