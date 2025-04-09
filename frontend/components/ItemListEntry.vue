<script setup lang="ts">
import type {Item} from "~/src/types";

const {item} = defineProps<{
  item: Item
}>();

const imageProvided: boolean = !!item.images && item.images.length > 0;
</script>

<template>
  <div class="flex-row flex items-center gap-2 m-2 px-4 py-2 rounded-full bg-slate-600">
    <img class="" v-if="imageProvided" :src="item.images?.at(0)" alt="photo of the item"/>
    <p class="text-slate-400">{{ item.amount }}x</p>
    <p class="text-white">{{ item.name }}</p>
    <p class="bg-slate-700 text-white rounded px-1 w-content text-sm" v-for="cat in item.expandedCategories" :key="cat.id" >{{ cat.name }}</p>
  </div>
</template>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>