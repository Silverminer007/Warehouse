<script setup lang="ts">
import {fetchRoom, fetchShelfsByRoom} from "~/src/dataloader";
import ShelfList from "~/components/ShelfList.vue";
import type {Room, Shelf} from "~/src/types";
import {HomeIcon} from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const roomData = await useAsyncData('room' + id, () => fetchRoom(id));
const room: Room | undefined = !!roomData.error.value ? undefined : roomData.data.value || undefined;

const shelfData = await useAsyncData('shelfs:' + id, () => fetchShelfsByRoom(id));
const error = !!shelfData.error.value;
const shelfs: Shelf[] = error ? [] : (shelfData.data.value || []);

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + room?.room_image + "?height=400";
</script>

<template>
  <div class="breadcrumbs text-white m-2">
    <ul>
      <li><a href="/"><HomeIcon class="h-6 w-6" /></a></li>
      <li>{{ room?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold" v-if="room && room.description">
    {{ room?.description }}
  </p>
  <img class="px-2" v-if="room && room.room_image" :src="imageSrc" alt="picture of the room"/>
  <ShelfList :shelfs="shelfs"/>
  <div v-if="shelfs.length == 0">
    <p class="text-white m-2 p-4 text-center text-xl">
      Keine Regale in diesem Raum. <a href="/" class="text-slate-400">Zurück zur Startseite</a>
    </p>
  </div>
</template>

<style scoped>

</style>