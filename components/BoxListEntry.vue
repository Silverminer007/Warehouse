<script setup lang="ts">
import type {Box} from "~/src/types";

const {box} = defineProps<{
  box: Box
}>();

const imageProvided: boolean = !!box.image;

const boxHref = "/boxes/" + box.id;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=40";
</script>

<template>
  <a :href="boxHref">
    <div class="flex-row flex items-center gap-2 m-2 px-4 py-2 rounded-full bg-slate-600">
      <img class="" v-if="imageProvided" :src="imageSrc" alt="photo of the box"/>
      <p class="text-white">{{ box.name }}</p>
      <p class="bg-slate-700 text-white rounded px-1 w-content text-sm" v-for="cat in box.expandedCategories"
         :key="cat.id">{{ cat.name }}</p>
    </div>
  </a>
</template>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>