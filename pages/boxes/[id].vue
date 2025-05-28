<script setup lang="ts">
import {fetchBox, fetchItemsByBox} from "~/src/dataloader";
import ItemList from "~/components/ItemList.vue";
import type {Item, Box} from "~/src/types";
import { HomeIcon } from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const boxData = await useAsyncData('box' + id, () => fetchBox(id));
const box: Box | undefined = !!boxData.error.value ? undefined : boxData.data.value || undefined;

const itemData = await useAsyncData('items:' + id, () => fetchItemsByBox(id));
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const shelfId: number | undefined = box?.shelf?.id;

const shelfHref = shelfId ? "/shelfs/" + shelfId : "/";
const roomHref = "/rooms/" + box?.shelf?.room?.id;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=400";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><NuxtLink to="/"><HomeIcon class="h-6 w-6" /></NuxtLink></li>
      <li><NuxtLink :to="roomHref">{{ box?.shelf?.room?.name }}</NuxtLink></li>
      <li><NuxtLink :to="shelfHref">{{ box?.shelf?.name }}</NuxtLink></li>
      <li>{{ box?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold" v-if="box && box.description">
    {{ box?.description }}
  </p>
  <img class="px-2" v-if="box && box.image" :src="imageSrc" alt="picture of the box"/>
  <ItemList :items="items" :location="true" :button-text="undefined"/>
  <div v-if="items.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal. <NuxtLink :to="shelfHref"
                                       class="link">{{
        shelfId ? "Zurück zum Raum" : "Zurück zur Startseite"
      }}</NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>