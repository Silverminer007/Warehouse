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
    </div>
  </a>
</template>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>