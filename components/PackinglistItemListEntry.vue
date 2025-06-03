<script setup lang="ts">
import type {Item} from "~/src/types";

const {item} = defineProps<{
  item: Item,
}>();
</script>

<template>
  <li class="list-row flex">
    <div class="flex flex-row items-center gap-2 flex-grow">
      <div class="flex flex-row justify-center items-center gap-1">
        <p class="text-base-content">{{ item.amount }}x</p>
        <p class="text-base-content text-xl">{{ item.name }}</p>
      </div>
    </div>
    <slot/>
  </li>
</template>

<style scoped>
</style>