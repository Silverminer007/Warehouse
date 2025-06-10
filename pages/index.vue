<script setup lang="ts">
import {fetchRooms} from '~/src/dataloader'
import type {Room} from "~/src/types";
import {HomeIcon, ArrowRightIcon} from "@heroicons/vue/24/solid";
import RoomListEntry from "~/components/RoomListEntry.vue";

const roomData = await useAsyncData('rooms', () =>
    fetchRooms()
);
const error = !!roomData.error.value;
const rooms: Room[] = error ? [] : (roomData.data.value || []);
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
</template>

<style scoped>

</style>