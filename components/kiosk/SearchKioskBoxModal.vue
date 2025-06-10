<script setup lang="ts">
import BoxListEntry from "~/components/BoxListEntry.vue";
import { PlusIcon } from "@heroicons/vue/24/outline";
import {fetchBoxesBySearchAndNotKioskBox} from "~/src/dataloader";

const searchText: Ref<string> = ref("");
const boxes: Ref<Box[]> = ref([]);

async function doSearch() {
  boxes.value = await fetchBoxesBySearchAndNotKioskBox(searchText.value);
}

async function addBox(box: Box) {
  const response = await fetch('https://items.kjg-st-barbara.de/items/Box/' + box.id, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      kiosk: true
    }),
  });
  if (response.ok) {
    boxes.value.splice(boxes.value.indexOf(box), 1);
  }
}
</script>

<template>
  <div class="flex flex-col">
    <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
      Kiosk Kisten hinzufügen
    </p>
    <div class="flex flex-row">
      <label class="floating-label m-2 flex flex-row flex-grow">
        <span>Suche</span>
        <input type="search" placeholder="Search..." v-model="searchText"
               class="input input-secondary"
               @keydown.enter="doSearch()" @input="doSearch"/>
      </label>
      <button @click="doSearch" class="btn btn-primary m-2">
        Suchen
      </button>
    </div>
    <ul class="list bg-base-200 rounded-box shadow-md m-2">
      <BoxListEntry v-for="box in boxes" :key="box.id" :box="box">
        <button type="button" @click="addBox(box)">
          <PlusIcon class="w-6 h-6"/>
        </button>
      </BoxListEntry>
    </ul>
  </div>
</template>

<style scoped>

</style>