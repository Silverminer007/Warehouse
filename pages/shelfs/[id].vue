<script setup lang="ts">
import {fetchBoxesByShelf, fetchShelf} from "~/src/dataloader";
import BoxList from "~/components/BoxList.vue";
import type {Box, Shelf} from "~/src/types";
import {HomeIcon} from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const shelfData = await useAsyncData('shelf' + id, () => {
  return fetchShelf(id);
});
const shelf: Shelf | undefined = !!shelfData.error.value ? undefined : shelfData.data.value || undefined;

const boxData = await useAsyncData('boxes:' + id, () => fetchBoxesByShelf(id));
const error = !!boxData.error.value;
const boxes: Box[] = error ? [] : (boxData.data.value || []);

const roomHref = "/rooms/" + shelf?.room;

const roomsOverviewHref = shelf?.room ? "/rooms/" + shelf?.room.id : "/";

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + shelf?.shelf_image + "?height=400";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><a href="/"><HomeIcon class="h-6 w-6" /></a></li>
      <li><a :href="roomHref">{{ shelf?.room?.name }}</a></li>
      <li>{{ shelf?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold" v-if="shelf && shelf.description">
    {{ shelf?.description }}
  </p>
  <img class="px-2" v-if="shelf && shelf.shelf_image" :src="imageSrc" alt="picture of the shelf"/>
  <BoxList :boxes="boxes" :roomId="shelf?.room?.id"/>
  <div v-if="boxes.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal. <a :href="roomsOverviewHref"
                                       class="link">{{ shelf?.room?.id ? "Zurück zum Raum" : "Zurück zur Startseite" }}</a>
    </p>
  </div>
</template>

<style scoped>

</style>