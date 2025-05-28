<script setup lang="ts">
import type {PackingList} from "~/src/types";

const {packingList} = defineProps<{
  packingList: PackingList
}>();
const packingListHref = "/packinglist/" + packingList.id;
</script>

<template>
  <li class="list-row">
    <NuxtLink :to="packingListHref">
      <p class="text-base-content text-xl">{{ packingList.name }}</p>
    </NuxtLink>
  </li>
</template>

<style scoped>
</style>