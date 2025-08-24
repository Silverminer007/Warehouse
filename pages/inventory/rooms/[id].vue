<script lang="ts" setup>
import {useShelfStore} from "~/stores/inventory/useShelfStore";
import {useRoute} from 'vue-router'
import RoomShelfList from '~/components/inventory/Room/RoomShelfList.vue'
import AddShelfModal from '~/components/inventory/Room/AddShelfModal.vue'
import {HomeIcon} from '@heroicons/vue/24/solid'
import {useRoomStore} from "~/stores/inventory/useRoomStore";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import {definePageMeta} from "#imports";

definePageMeta({
  alias: ['/rooms/:id']
})

const id = useRoute().params.id as string

const addShelfModal = ref(false);

const shelfStore = useShelfStore()
await shelfStore.fetchShelves();
const roomStore = useRoomStore();
await roomStore.fetchRooms();

roomStore.setCurrentRoom(id);
</script>

<template>
  <Breadcrumbs :links="[
      { to: '/', icon: HomeIcon },
      { to: '/inventory', label: 'Inventar' },
      { label: `${roomStore.currentRoom?.name}` },
  ]"/>

  <p v-if="roomStore.currentRoom?.description"
     class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit">
    {{ roomStore.currentRoom.description }}
  </p>
  <img v-if="roomStore.currentRoom?.room_image"
       :src="`https://items.kjg-st-barbara.de/assets/${roomStore.currentRoom.room_image}?height=400`"
       alt="Room image" class="px-2"/>

  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">{{ roomStore.currentRoom?.name || 'Regale' }}</p>
  <RoomShelfList/>
  <div v-if="shelfStore.getByRoomId(id)?.length === 0" class="m-2 p-4 text-center text-xl text-base-content">
    Keine Regale in diesem Raum.
    <NuxtLink class="link" to="/">Zurück zur Startseite</NuxtLink>
  </div>
  <div class="flex justify-center p-2">
    <button class="btn btn-primary" @click="addShelfModal = true">Regal hinzufügen +
    </button>
  </div>
  <AddShelfModal :visible="addShelfModal" @closeDialog="addShelfModal = false"/>
</template>