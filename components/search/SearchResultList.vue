<script setup lang="ts">
import type { Item } from "@/types/inventory";
import ItemListEntry from "~/components/inventory/Box/ItemListEntry.vue";

defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <li v-for="item in items" :key="item.id" class="flex flex-row items-center">
      <ItemListEntry :item="item" class="flex-grow" :location="true" />
    </li>
  </ul>
</template>