<script setup lang="ts">

import {CheckCircleIcon} from "@heroicons/vue/24/solid";
import type {Shelf} from "~/types/inventory";
import {useRoomStore} from "~/stores/inventory/useRoomStore";
import {useShelfStore} from "~/stores/inventory/useShelfStore";

defineProps<{
  visible: boolean;
  shelf: Shelf;
}>()
const emit = defineEmits<{
  (e: 'closeDialog'): void;
}>()

const roomStore = useRoomStore();
const shelfStore = useShelfStore();

const searchText = ref<string>("");
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">{{ shelf.name }} verschieben</p>
      <label class="floating-label m-2 flex flex-row">
        <span>Suche</span>
        <input v-model="searchText" autofocus class="input input-secondary" placeholder="Search..." type="search"/>
      </label>
      <ul class="list">
        <li v-for="targetRoom in roomStore.getBySearch(searchText)?.filter(r => r.id !== roomStore.currentRoom?.id) || []"
            :key="targetRoom.id"
            class="list-row flex items-center gap-2">
          <span class="flex-grow text-xl">{{ targetRoom.name }}</span>
          <button class="btn" @click="shelfStore.moveShelfToRoom(shelf, targetRoom)">
            <CheckCircleIcon class="h-6 w-6 text-primary"/>
          </button>
        </li>
      </ul>
    </div>
    <form class="modal-backdrop">
      <button @click="emit('closeDialog')"/>
    </form>
  </dialog>
</template>

<style scoped>

</style>