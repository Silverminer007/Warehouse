<script setup lang="ts">
import type {Room} from "~/src/types";
import RoomListEntry from "~/components/RoomListEntry.vue";

const {rooms} = defineProps<{
  rooms: Room[]
}>();
</script>

<template>
  <RoomListEntry v-for="room in rooms" :key="room.id" :room="room"/>
</template>

<style scoped>

</style>