<!-- components/inventory/ShelfListEntry.vue -->
<script lang="ts" setup>
import type {Shelf} from '~/types/inventory'

const config = useRuntimeConfig()
const DIRECTUS_URL = config.public.directusUrl

const props = defineProps<{
  shelf: Shelf
}>()

const shelfHref = `/shelfs/${props.shelf.id}`
const imageSrc = props.shelf.shelf_image
    ? `${DIRECTUS_URL}/assets/${props.shelf.shelf_image}?height=40`
    : ''
</script>

<template>
  <li class="list-row flex flex-row items-center gap-2">
    <NuxtLink :to="shelfHref" class="flex-grow flex items-center gap-2">
      <img
          v-if="props.shelf.shelf_image"
          :src="imageSrc"
          alt="Foto des Regals"
          class="h-10 w-auto object-cover"
      />
      <p class="text-base-content text-xl">{{ props.shelf.name }}</p>
    </NuxtLink>
    <slot/>
  </li>
</template>