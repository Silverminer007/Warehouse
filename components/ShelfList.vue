<script setup lang="ts">
import type {Shelf} from "~/src/types";
import ShelfListEntry from "~/components/ShelfListEntry.vue";

const {shelfs} = defineProps<{
  shelfs: Shelf[]
}>();
</script>

<template>
  <ShelfListEntry v-for="shelf in shelfs" :key="shelf.id" :shelf="shelf"/>
</template>

<style scoped>

</style>