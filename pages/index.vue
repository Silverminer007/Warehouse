<script setup lang="ts">
import {fetchRooms} from '~/src/dataloader'
import type {Data, Room, Shelf} from "~/src/types";
import {HomeIcon, ArrowRightIcon} from "@heroicons/vue/24/solid";
import RoomListEntry from "~/components/RoomListEntry.vue";

const roomData = await useAsyncData('rooms', () =>
    fetchRooms()
);
const error = !!roomData.error.value;
const rooms: Room[] = error ? [] : (roomData.data.value || []);

const newRoomName = ref("");

function sortRooms() {
  rooms.sort((a, b) => a.name.localeCompare(b.name));
}

async function addRoom() {
  if (!newRoomName.value) {
    return;
  }
  const res = await fetch('https://items.kjg-st-barbara.de/items/Room', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": newRoomName.value
    })
  });
  if (res.ok) {
    const json = await res.json();
    const room = (json as Data).data as Room;
    rooms.push(room);
  }
  newRoomName.value = "";
  sortRooms();
}
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><NuxtLink to="/">
        <HomeIcon class="h-6 w-6"/>
      </NuxtLink></li>
    </ul>
  </div>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Features
  </p>
  <NuxtLink to="/packinglist" class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2">
    <p class="text-2xl text-secondary-content flex-grow">Packlisten</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink to="/kiosk" class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2">
    <p class="text-2xl text-secondary-content flex-grow">Kiosk</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink to="/search" class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2">
    <p class="text-2xl text-secondary-content flex-grow">Gegenstände suchen</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <div class="divider"/>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Räume
  </p>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <RoomListEntry v-for="room in rooms" :key="room.id" :room="room"/>
  </ul>
  <div class="flex flex-row items-center justify-center p-2">
    <button class="btn btn-primary" type="button" onclick="add_room.showModal()">
      Raum hinzufügen +
    </button>
  </div>
  <dialog id="add_room" class="modal">
    <div class="modal-box">
      <p class="text-xl">{{ 'Raum hinzufügen' }}</p>
      <div class="flex flex-row items-center justify-center p-2 gap-2">
        <input type="text" class="input input-primary validator"
               minlength="1" required placeholder="Name" v-model="newRoomName">
        <button class="btn btn-primary" type="button" @click="addRoom">
          + Add
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>

</style>