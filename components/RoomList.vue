<script setup lang="ts">
import type {Room} from "~/src/types";
import RoomListEntry from "~/components/RoomListEntry.vue";

const {rooms} = defineProps<{
  rooms: Room[]
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <RoomListEntry v-for="room in rooms" :key="room.id" :room="room"/>
  </ul>
</template>

<style scoped>

</style>