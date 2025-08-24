<script setup lang="ts">
import {useItemStore} from "~/stores/inventory/useItemStore";
import type { Item} from '@/types/inventory'
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/24/outline";

defineProps<{
  item: Item
}>()

const itemStore = useItemStore();
</script>

<template>
  <div class="flex flex-row justify-center items-center gap-1">
    <button
        :disabled="item.amount <= 1"
        class="btn btn-secondary btn-square"
        type="button"
        @click="itemStore.minusOne(item)"
    >
      <MinusCircleIcon class="h-6 w-6" />
    </button>

    <p class="text-base-content text-lg min-w-4">{{ item.amount }}x</p>

    <button
        class="btn btn-secondary btn-square"
        type="button"
        @click="itemStore.addOne(item)"
    >
      <PlusCircleIcon class="h-6 w-6" />
    </button>
  </div>
</template>

<style scoped>

</style>