<script setup lang="ts">
import type { Item } from "~/types/item";
import SellItemCard from "./SellItemCard.vue";

defineProps<{
  items: Item[];
  shoppingCart: Map<Item, number>;
  searchText: string;
}>();
defineEmits(["add"]);
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <SellItemCard
        v-for="item in items.filter(i => i.name.toLowerCase().includes(searchText.toLowerCase()))"
        :key="item.id"
        :item="item"
        :quantity="shoppingCart.get(item)"
        @add="$emit('add', $event)"
    />
  </div>
</template>