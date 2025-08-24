<script lang="ts" setup>
import {ref} from 'vue'
import {ArrowsRightLeftIcon} from '@heroicons/vue/24/solid'
import {useShelfStore} from "~/stores/inventory/useShelfStore";
import {useRoomStore} from "~/stores/inventory/useRoomStore";
import MoveShelfModal from "~/components/inventory/Room/MoveShelfModal.vue";
import type { Shelf } from '@/types/inventory'

const shelfStore = useShelfStore();
const roomStore = useRoomStore();

const moveShelf = ref<Shelf | null>(null);
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <li v-for="shelf in shelfStore.getByRoomId(roomStore.currentRoom.id)" :key="shelf.id"
        class="list-row flex items-center justify-between">
      <NuxtLink :to="`/inventory/shelves/${shelf.id}`">
        <span class="text-lg">{{ shelf.name }}</span>
      </NuxtLink>
      <button class="btn" @click="moveShelf = shelf">
        <ArrowsRightLeftIcon class="h-6 w-6 text-primary"/>
      </button>

      <MoveShelfModal :visible="moveShelf" :shelf="moveShelf" @closeDialog="moveShelf = null"/>
    </li>
  </ul>
</template>