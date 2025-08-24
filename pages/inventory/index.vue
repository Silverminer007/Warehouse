<!-- pages/inventory/index.vue -->
<script lang="ts" setup>
import {useRoomStore} from '~/stores/inventory/useRoomStore'
import {HomeIcon} from '@heroicons/vue/24/solid'
import RoomListEntry from '~/components/inventory/RoomListEntry.vue'
import AddRoomModal from '~/components/inventory/AddRoomModal.vue'
import Breadcrumbs from "~/components/Breadcrumbs.vue";

const roomStore = useRoomStore()
roomStore.fetchRooms()

const addRoomModal = ref<boolean>(false);
</script>

<template>
  <!-- Breadcrumb -->
  <Breadcrumbs :links="[
      {to: '/', icon: HomeIcon},
      {label: 'Inventar'},
  ]"/>

  <!-- Rooms -->
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">Räume</p>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <RoomListEntry v-for="room in roomStore.rooms" :key="room.id" :room="room"/>
  </ul>

  <div class="flex flex-row items-center justify-center p-2">
    <button class="btn btn-primary" @click="addRoomModal = true" type="button">
      Raum hinzufügen +
    </button>
  </div>

  <!-- Add Room Modal -->
  <AddRoomModal :visible="addRoomModal" @click="addRoomModal = false"/>
</template>