<script setup lang="ts">
import type {Item} from "~/src/types";

const {items} = defineProps<{
  items: Item[]
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <ItemListEntry v-for="item in items" :key="item.id" :item="item"/>
  </ul>
</template>

<style scoped>

</style>