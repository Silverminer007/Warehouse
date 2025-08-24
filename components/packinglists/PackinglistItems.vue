<script setup lang="ts">
import type { Item } from "@/types/inventory";
import PackinglistItemListEntry from "~/components/packinglists/PackinglistItemListEntry.vue";
import {usePackingListStore} from "~/stores/packinglists/usePackingListStore";

const props = defineProps<{
  items: Item[] | undefined;
  packinglistId: number;
}>();

const store = usePackingListStore();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <li v-for="item in items" :key="item.id" class="flex flex-row items-center">
      <PackinglistItemListEntry :item="item" class="flex-grow">
        <button class="btn btn-primary mr-4" @click="store.removeItemFromList(props.packinglistId, item)">
          ✕ Entfernen
        </button>
      </PackinglistItemListEntry>
    </li>
  </ul>
</template>