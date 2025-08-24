<script setup lang="ts">
import type {Item} from "~/types/inventory";

const props = defineProps<{
  item: Item
}>()
</script>

<template>
  <div v-if="props.item?.box?.shelf?.room">
    <div class="badge badge-neutral">{{ props.item.box?.shelf?.room?.name }}</div>
    >
    <div class="badge badge-neutral">{{ props.item.box?.shelf?.name }}</div>
    >
    <div class="badge badge-neutral">{{ props.item.box?.name }}</div>
  </div>
</template>

<style scoped>

</style>