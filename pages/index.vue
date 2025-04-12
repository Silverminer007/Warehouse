<script setup lang="ts">
import {fetchRooms} from '~/src/dataloader'
import RoomList from "~/components/RoomList.vue";
import type {Room} from "~/src/types";
import {HomeIcon} from "@heroicons/vue/24/solid";

const roomData = await useAsyncData('rooms', () =>
    fetchRooms()
);
const error = !!roomData.error.value;
const rooms: Room[] = error ? [] : (roomData.data.value || []);
</script>

<template>
  <div class="flex flex-row items-center gap">
    <a href="/" class="m-2 p-4 rounded-xl bg-slate-700 text-bold">
      <HomeIcon class="h-6 w-6 text-white"/>
    </a>
  </div>
  <RoomList :rooms="rooms"/>
</template>

<style scoped>

</style>