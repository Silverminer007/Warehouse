<script setup lang="ts">
import {fetchRoom, fetchShelfsByRoom} from "~/src/dataloader";
import type {Room, Shelf} from "~/src/types";
import {HomeIcon} from "@heroicons/vue/24/solid";
import ShelfListEntry from "~/components/ShelfListEntry.vue";

const id = useRoute().params.id;

const roomData = await useAsyncData('room' + id, () => fetchRoom(id));
const room: Room | undefined = !!roomData.error.value ? undefined : roomData.data.value || undefined;

const shelfData = await useAsyncData('shelfs:' + id, () => fetchShelfsByRoom(id));
const error = !!shelfData.error.value;
const shelfs: Shelf[] = error ? [] : (shelfData.data.value || []);

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + room?.room_image + "?height=400";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><NuxtLink to="/"><HomeIcon class="h-6 w-6" /></NuxtLink></li>
      <li>{{ room?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold" v-if="room && room.description">
    {{ room?.description }}
  </p>
  <img class="px-2" v-if="room && room.room_image" :src="imageSrc" alt="picture of the room"/>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <ShelfListEntry v-for="shelf in shelfs" :key="shelf.id" :shelf="shelf"/>
  </ul>
  <div v-if="shelfs.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Regale in diesem Raum. <NuxtLink to="/" class="link">Zurück zur Startseite</NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>