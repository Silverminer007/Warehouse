<script lang="ts" setup>
import type {Shelf} from '@/types/inventory'

const config = useRuntimeConfig()
const DIRECTUS_URL = config.public.directusUrl

const props = defineProps<{ shelf?: Shelf }>()
</script>

<template>
  <img v-if="props.shelf?.shelf_image"
       :alt="props.shelf.name"
       :src="`${DIRECTUS_URL}/assets/${props.shelf.shelf_image}?height=400`"
       class="px-2"/>
</template>