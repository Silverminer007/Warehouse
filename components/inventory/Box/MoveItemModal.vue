<script setup lang="ts">
import {CheckCircleIcon} from "@heroicons/vue/24/solid";
import type {Item} from '@/types/inventory'
import {useBoxStore} from "~/stores/inventory/useBoxStore";
import {useItemStore} from "~/stores/inventory/useItemStore";

const props = defineProps<{
  visible: boolean,
  item: Item
}>()

const emit = defineEmits<{
  (e: 'closeDialog'): void
}>()

const boxStore = useBoxStore();
const itemStore = useItemStore();

const searchText = ref<string>('')

watch(props.item, () => {
  searchText.value = '';
})
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">{{ item?.name }} verschieben</p>
      <label class="floating-label m-2 flex flex-row">
        <span>Suche</span>
        <input v-model="searchText" class="input input-secondary" placeholder="Search..." type="search"/>
      </label>
      <ul class="list">
        <li v-for="moveToBox in boxStore.getBySearch(searchText)?.filter(b => b.id !== boxStore.currentBox?.id) || []"
            :key="moveToBox.id"
            class="list-row flex flex-row items-center gap-2">
          <span class="flex-grow text-base-content text-xl">{{ moveToBox.name }}</span>
          <button class="btn" @click="itemStore.moveItemToBox(item, moveToBox)">
            <CheckCircleIcon class="h-6 w-6 text-primary"/>
          </button>
        </li>
      </ul>
    </div>
    <form class="modal-backdrop">
      <button @click="emit('closeDialog')">close</button>
    </form>
  </dialog>
</template>

<style scoped>

</style>