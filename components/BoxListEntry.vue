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
  <li class="list-row flex">
    <NuxtLink :to="boxHref" class="flex-grow">
      <img class="" v-if="imageProvided" :src="imageSrc" alt="photo of the box"/>
      <p class="text-base-content text-xl">{{ box.name }}</p>
    </NuxtLink>
    <slot/>
  </li>
</template>

<style scoped>
</style>