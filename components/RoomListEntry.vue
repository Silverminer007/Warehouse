<script setup lang="ts">
import type {Room} from "~/src/types";

const {room} = defineProps<{
  room: Room
}>();
const roomHref = "/rooms/" + room.id;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + room?.room_image + "?height=40";
</script>

<template>
  <a :href="roomHref">
    <div class="flex-row flex items-center gap-2 m-2 px-4 py-2 rounded-full bg-slate-600">
      <img v-if="room && room.room_image" :src="imageSrc" alt="photo of the room"/>
      <p class="text-white">{{ room.name }}</p>
    </div>
  </a>
</template>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>