<script setup lang="ts">
import type {Room} from "~/src/types";

const {room} = defineProps<{
  room: Room
}>();
const roomHref = "/rooms/" + room.id;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + room?.room_image + "?height=40";
</script>

<template>
  <li class="list-row flex flex-row items-center gap-2">
    <NuxtLink :to="roomHref" class="flex-grow">
      <img v-if="room && room.room_image" :src="imageSrc" alt="photo of the room"/>
      <p class="text-base-content text-xl">{{ room.name }}</p>
    </NuxtLink>
    <slot/>
  </li>
</template>

<style scoped>
</style>