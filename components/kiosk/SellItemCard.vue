<script setup lang="ts">
import type { Item } from "~/types/item";

defineProps<{
  item: Item;
  quantity?: number;
}>();
defineEmits(["add"]);
</script>

<template>
  <div class="indicator m-4 w-11/12" @click="$emit('add', item)">
    <span v-if="quantity" class="indicator-item badge badge-secondary">{{ quantity }}</span>
    <div class="inline-block card card-border border-secondary bg-base-100 shadow-sm w-full">
      <figure class="px-10 pt-10">
        <img
            :src="`https://items.kjg-st-barbara.de/assets/${item.item_image}?height=200`"
            :alt="item.name"
            class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">{{ item.name }}</h2>
        <p>{{ item.price.toFixed(2) }} €</p>
        <p>{{ item.amount }} Stück verfügbar</p>
      </div>
    </div>
  </div>
</template>