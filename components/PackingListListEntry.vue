<script setup lang="ts">
import type {PackingList} from "~/src/types";

const {packingList} = defineProps<{
  packingList: PackingList
}>();
const packingListHref = "/packinglist/" + packingList.id;
</script>

<template>
  <li class="list-row">
    <a :href="packingListHref">
      <p class="text-base-content text-xl">{{ packingList.name }}</p>
    </a>
  </li>
</template>

<style scoped>
</style>