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

const shelfHref = shelfId ? "/shelfs/" + shelfId : "/";
const roomHref = "/rooms/" + box?.expandedShelf.room;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=400";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><a href="/"><HomeIcon class="h-6 w-6" /></a></li>
      <li><a :href="roomHref">{{ box?.expandedShelf?.expandedRoom?.name }}</a></li>
      <li><a :href="shelfHref">{{ box?.expandedShelf?.name }}</a></li>
      <li>{{ box?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-base-content rounded-xl bg-base-200 w-fit text-bold" v-if="box && box.description">
    {{ box?.description }}
  </p>
  <img class="px-2" v-if="box && box.image" :src="imageSrc" alt="picture of the box"/>
  <ItemList :items="items"/>
  <div v-if="items.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal. <a :href="shelfHref"
                                       class="link">{{
        shelfId ? "Zurück zum Raum" : "Zurück zur Startseite"
      }}</a>
    </p>
  </div>
</template>

<style scoped>

</style>