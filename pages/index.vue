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
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><a href="/"><HomeIcon class="h-6 w-6" /></a></li>
    </ul>
  </div>
  <RoomList :rooms="rooms"/>
</template>

<style scoped>

</style>