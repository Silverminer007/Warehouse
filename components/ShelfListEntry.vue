<script setup lang="ts">
import type {Shelf} from "~/src/types";

const {shelf} = defineProps<{
  shelf: Shelf
}>();

const imageProvided: boolean = !!shelf.shelf_image;

const shelfHref = "/shelfs/" + shelf.id;
const imageSrc = "https://items.kjg-st-barbara.de/assets/" + shelf?.shelf_image + "?height=40";
</script>

<template>
  <a :href="shelfHref">
    <div class="flex-row flex items-center gap-2 m-2 px-4 py-2 rounded-full bg-slate-600">
      <img class="" v-if="imageProvided" :src="imageSrc" alt="photo of the shelf"/>
      <p class="text-white">{{ shelf.name }}</p>
    </div>
  </a>
</template>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>