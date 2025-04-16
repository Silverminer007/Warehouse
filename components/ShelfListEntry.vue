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
  <li class="list-row">
    <a :href="shelfHref">
      <img class="" v-if="imageProvided" :src="imageSrc" alt="photo of the shelf"/>
      <p class="text-white text-xl">{{ shelf.name }}</p>
    </a>
  </li>
</template>

<style scoped>
</style>