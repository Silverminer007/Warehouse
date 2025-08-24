<script setup lang="ts">
import type {PackingList} from '@/types/packinglist'
import {defineProps} from 'vue'

defineProps<{
  packingList: PackingList
}>()
</script>

<template>
  <li class="p-4 flex flex-col md:flex-row md:items-center justify-between border-b border-base-300 hover:bg-base-200 rounded-md transition">
    <NuxtLink
        :to="`/packinglists/${packingList.id}`"
        class="flex-grow text-lg font-semibold text-primary hover:underline"
    >
      {{ packingList.name }}
    </NuxtLink>

    <span class="text-sm text-base-content/70 mt-1 md:mt-0">
      {{ packingList.expandedItems?.length || 0 }} Gegenstände
    </span>

    <NuxtLink
        :to="`/packinglists/${packingList.id}`"
        class="btn btn-sm btn-primary ml-2 mt-2 md:mt-0"
    >
      Details
    </NuxtLink>
  </li>
</template>

<style scoped>
/* Optional: kleine Hover-Animation für Listeneinträge */
li:hover {
  transform: translateY(-1px);
  transition: transform 0.1s ease-in-out;
}
</style>