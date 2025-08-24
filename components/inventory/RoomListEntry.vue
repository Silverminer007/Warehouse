<!-- components/inventory/RoomListEntry.vue -->
<script lang="ts" setup>
import type {Room} from '@/types/inventory'

const props = defineProps<{
  room: Room
}>()

const roomHref = `/inventory/rooms/${props.room.id}`
const imageSrc = props.room.room_image
    ? `https://items.kjg-st-barbara.de/assets/${props.room.room_image}?height=40`
    : ''
</script>

<template>
  <li class="list-row flex flex-row items-center gap-2">
    <NuxtLink :to="roomHref" class="flex-grow flex items-center gap-2">
      <img
          v-if="props.room.room_image"
          :src="imageSrc"
          alt="Foto des Raums"
          class="h-10 w-auto object-cover"
      />
      <div>
        <p class="text-base-content text-xl">{{ props.room.name }}</p>
        <p class="text-base-content/60 text-l" v-if="props.room.description">{{props.room.description}}</p>
      </div>
    </NuxtLink>
    <slot/>
  </li>
</template>