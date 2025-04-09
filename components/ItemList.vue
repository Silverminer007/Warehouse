<script setup lang="ts">
import type {Item} from "~/src/types";

const {items} = defineProps<{
  items: Item[]
}>();
</script>

<template>
  <ItemListEntry v-for="item in items" :key="item.id" :item="item"/>
</template>

<style scoped>

</style>