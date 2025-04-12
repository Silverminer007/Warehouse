<script setup lang="ts">
import {fetchBox, fetchItemsByBox} from "~/src/dataloader";
import ItemList from "~/components/ItemList.vue";
import type {Item, Box} from "~/src/types";
import { HomeIcon } from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const boxData = await useAsyncData('box' + id, () => fetchBox(id, true));
const box: Box | undefined = !!boxData.error.value ? undefined : boxData.data.value || undefined;

const itemData = await useAsyncData('items:' + id, () => fetchItemsByBox(id));
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const shelfId: number | undefined = box?.shelf;

const shelfHref = shelfId ? "/shelfs/" + id : "/";
const roomHref = "/rooms/" + box?.expandedShelf.room;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=400";
</script>

<template>
  <div class="flex flex-row items-center gap">
    <a href="/" class="m-2 p-4 rounded-xl bg-slate-700 text-bold">
      <HomeIcon class="h-6 w-6 text-white" />
    </a>
    <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold text-xl"
       v-if="box?.expandedShelf?.expandedRoom"> > </p>
    <a :href="roomHref" v-if="box?.expandedShelf?.expandedRoom"
       class="m-2 p-4 text-white rounded-xl bg-slate-700 w-fit text-bold text-xl">
      {{ box?.expandedShelf?.expandedRoom?.name }}
    </a>
    <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold text-xl"
       v-if="box?.expandedShelf?.expandedRoom"> > </p>
    <a :href="shelfHref" v-if="box?.expandedShelf?.expandedRoom"
       class="m-2 p-4 text-white rounded-xl bg-slate-700 w-fit text-bold text-xl">
      {{ box?.expandedShelf?.name }}
    </a>
    <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold text-xl"
       v-if="box?.expandedShelf?.expandedRoom"> > </p>
    <p class="m-2 p-4 text-white rounded-xl bg-slate-700 w-fit text-bold text-xl">{{ box?.name }}</p>
  </div>
  <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold" v-if="box && box.description">
    {{ box?.description }}
  </p>
  <img class="px-2" v-if="box && box.image" :src="imageSrc" alt="picture of the box"/>
  <ItemList :items="items"/>
  <div v-if="items.length == 0">
    <p class="text-white m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal. <a :href="shelfHref"
                                       class="text-slate-400">{{
        shelfId ? "Zurück zum Raum" : "Zurück zur Startseite"
      }}</a>
    </p>
  </div>
</template>

<style scoped>

</style>