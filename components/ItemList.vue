<script setup lang="ts">
import type {Item} from "~/src/types";

const {items, buttonText = undefined, location = false} = defineProps<{
  items: Item[],
  buttonText: string | undefined,
  location: boolean | undefined
}>();

const emit = defineEmits([
  'click'
])

function itemClicked(item: Item) {
  emit('click', item);
}
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <div v-for="item in items" :key="item.id" class="flex flex-row items-center">
      <ItemListEntry :item="item" class="flex-grow" :location="location"/>
      <button class="btn btn-primary mr-4" @click="itemClicked(item)" v-if="buttonText">
        {{ buttonText }}
      </button>
    </div>
  </ul>
</template>

<style scoped>

</style>