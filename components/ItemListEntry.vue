<script setup lang="ts">
import type {Item} from "~/src/types";

const {item} = defineProps<{
  item: Item
}>();

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + item?.item_image + "?height=40";
</script>

<template>
  <div class="flex-row flex items-center gap-2 m-2 px-4 py-2 rounded-full bg-slate-600">
    <img class="" v-if="item && item.item_image" :src="imageSrc" alt="photo of the item"/>
    <div class="flex flex-col">
      <div class="flex flex-row items-center gap-2">
        <p class="text-slate-400">{{ item.amount }}x</p>
        <p class="text-white">{{ item.name }}</p>
        <p class="bg-slate-700 text-white rounded px-1 w-content text-sm" v-for="cat in item.expandedCategories"
           :key="cat.id">{{ cat.name }}</p>
      </div>
      <div v-if="item.expandedBox && item.expandedBox.expandedShelf && item.expandedBox.expandedShelf.expandedRoom">
        <p class="bg-slate-700 text-white rounded px-1 w-content text-sm">
          {{ item.expandedBox?.expandedShelf?.expandedRoom?.name }} > {{ item.expandedBox?.expandedShelf?.name }} > {{ item.expandedBox?.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>