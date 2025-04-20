<script setup lang="ts">
import type {Item} from "~/src/types";

const {item, location} = defineProps<{
  item: Item,
  location: Boolean | boolean
}>();

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + item?.item_image + "?height=40";
</script>

<template>
  <li class="list-row">
    <img class="" v-if="item && item.item_image" :src="imageSrc" alt="photo of the item"/>
    <div class="flex flex-col gap-1">
      <div class="flex flex-row items-center gap-2">
        <p class="text-base-content/30">{{ item.amount }}x</p>
        <p class="text-base-content text-xl">{{ item.name }}</p>
        <p class="badge badge-neutral" v-if="item.category">{{ item.category?.name }}</p>
      </div>
      <div v-if="item?.box?.shelf?.room && location">
        <div class="badge badge-neutral">
          {{ item.box?.shelf?.room?.name }}
        </div>
        >
        <div class="badge badge-neutral">
          {{ item.box?.shelf?.name }}
        </div>
        >
        <div class="badge badge-neutral">
          {{ item.box?.name }}
        </div>
      </div>
    </div>
  </li>
</template>

<style scoped>
</style>