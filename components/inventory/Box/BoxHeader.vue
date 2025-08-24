<script lang="ts" setup>
import {useBoxStore} from "~/stores/inventory/useBoxStore";

const config = useRuntimeConfig()
const DIRECTUS_URL = config.public.directusUrl

const boxStore = useBoxStore()
</script>

<template>
  <div v-if="boxStore.currentBox?.description"
       class="m-2 p-4 bg-base-200 rounded-xl border border-dashed border-info text-info w-fit">
    {{ boxStore.currentBox.description }}
  </div>
  <img v-if="boxStore.currentBox?.image"
       :src="`${DIRECTUS_URL}/assets/${props.box.image}?height=400`"
       alt="picture of the box" class="px-2"/>
</template>