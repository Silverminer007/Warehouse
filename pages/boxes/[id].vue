<script setup lang="ts">
import {fetchBox, fetchItemsByBox} from "~/src/dataloader";
import ItemList from "~/components/ItemList.vue";
import type {Item, Box} from "~/src/types";

const id = useRoute().params.id;

const boxData = await useAsyncData('box' + id, () => fetchBox(id));
const box: Box | undefined = !!boxData.error.value ? undefined : boxData.data.value || undefined;

const itemData = await useAsyncData('items:' + id, () => fetchItemsByBox(id));
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const shelfId: number | undefined = items.length > 0 ?
    items[0].expandedBox?.shelf
    : (await useAsyncData('box', () => fetchBox(id))).data.value?.shelf || undefined;

const boxesOverviewHref = shelfId ? "/shelfs/" + id : "/";

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=400";
</script>

<template>
  <a :href="boxesOverviewHref">
    <p class="m-2 p-4 text-white rounded-xl bg-slate-700 w-fit text-bold text-xl" v-if="box">{{ box?.name }}</p>
  </a>
  <p class="m-2 p-4 text-slate-400 rounded-xl bg-slate-700 w-fit text-bold" v-if="box && box.description">
    {{ box?.description }}
  </p>
  <img class="px-2" v-if="box && box.image" :src="imageSrc" alt="picture of the box"/>
  <ItemList :items="items"/>
  <div v-if="items.length == 0">
    <p class="text-white m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal. <a :href="boxesOverviewHref"
                                       class="text-slate-400">{{ shelfId ? "Zurück zum Raum" : "Zurück zur Startseite" }}</a>
    </p>
  </div>
</template>

<style scoped>

</style>