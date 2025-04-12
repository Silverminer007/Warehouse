<script setup lang="ts">
import {fetchBoxesByShelf, fetchShelf} from "~/src/dataloader";
import BoxList from "~/components/BoxList.vue";
import type {Box, Shelf} from "~/src/types";
import {HomeIcon} from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const shelfData = await useAsyncData('shelf' + id, () => {
  return fetchShelf(id, true);
});
const shelf: Shelf | undefined = !!shelfData.error.value ? undefined : shelfData.data.value || undefined;

const boxData = await useAsyncData('boxes:' + id, () => fetchBoxesByShelf(id));
const error = !!boxData.error.value;
const boxes: Box[] = error ? [] : (boxData.data.value || []);

const roomHref = "/rooms/" + shelf?.room;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + shelf?.shelf_image + "?height=400";
</script>

<template>
  <div class="flex flex-row items-center gap">
    <a href="/" class="m-2 p-4 rounded-xl bg-slate-700 text-bold">
      <HomeIcon class="h-6 w-6 text-white" />
    </a>
    <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold text-xl"
       v-if="shelf?.expandedRoom"> > </p>
    <a :href="roomHref" v-if="shelf?.expandedRoom"
       class="m-2 p-4 text-white rounded-xl bg-slate-700 w-fit text-bold text-xl">
      {{ shelf?.expandedRoom?.name }}
    </a>
    <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold text-xl"
       v-if="shelf?.expandedRoom"> > </p>
    <p v-if="shelf"
       class="m-2 p-4 text-white rounded-xl bg-slate-700 w-fit text-bold text-xl">
      {{ shelf.name }}
    </p>
  </div>
  <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold" v-if="shelf && shelf.description">
    {{ shelf?.description }}
  </p>
  <img class="px-2" v-if="shelf && shelf.shelf_image" :src="imageSrc" alt="picture of the shelf"/>
  <BoxList :boxes="boxes" :roomId="roomId"/>
  <div v-if="boxes.length == 0">
    <p class="text-white m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal. <a :href="roomsOverviewHref"
                                       class="text-slate-400">{{ roomId ? "Zurück zum Raum" : "Zurück zur Startseite" }}</a>
    </p>
  </div>
</template>

<style scoped>

</style>