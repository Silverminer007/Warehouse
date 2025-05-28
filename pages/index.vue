<script setup lang="ts">
import {fetchRooms} from '~/src/dataloader'
import RoomList from "~/components/RoomList.vue";
import type {Room} from "~/src/types";
import {HomeIcon, ArrowRightIcon} from "@heroicons/vue/24/solid";

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
  <NuxtLink to="/packinglist" class="bg-primary flex flex-row items-center rounded-xl p-2">
    <p class="text-2xl text-primary-content flex-grow">Packlisten</p>
    <ArrowRightIcon class="h-6 w-6 text-primary-content"/>
  </NuxtLink>
  <div class="divider"/>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Räume
  </p>
  <RoomList :rooms="rooms"/>
</template>

<style scoped>

</style>