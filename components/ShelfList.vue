<script setup lang="ts">
import type {Shelf} from "~/src/types";
import ShelfListEntry from "~/components/ShelfListEntry.vue";

const {shelfs} = defineProps<{
  shelfs: Shelf[]
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <ShelfListEntry v-for="shelf in shelfs" :key="shelf.id" :shelf="shelf"/>
  </ul>
</template>

<style scoped>

</style>