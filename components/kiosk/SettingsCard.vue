<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

defineProps<{
  to: string;
  label: string;
}>();
</script>

<template>
  <NuxtLink
      :to="to"
      class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2"
  >
    <p class="text-2xl text-secondary-content flex-grow">{{ label }}</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content" />
  </NuxtLink>
</template>