<script setup lang="ts">
import type {PackingList} from "~/src/types";

const {packingLists} = defineProps<{
  packingLists: PackingList[]
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <PackingListListEntry v-for="packingList in packingLists" :key="packingList.id" :packing-list="packingList"/>
  </ul>
</template>

<style scoped>

</style>