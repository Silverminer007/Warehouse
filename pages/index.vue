<script setup lang="ts">
import {fetchRooms} from '~/src/dataloader'
import RoomList from "~/components/RoomList.vue";
import type {Room} from "~/src/types";

const roomData = await useAsyncData('rooms', () =>
    fetchRooms()
);
const error = !!roomData.error.value;
const rooms : Room[] = error ? [] : (roomData.data.value || []);
</script>

<template>
  <div>
    <h1>Welcome to KjG Warehouse</h1>
    <RoomList :rooms="rooms" />
  </div>
</template>

<style scoped>

</style>