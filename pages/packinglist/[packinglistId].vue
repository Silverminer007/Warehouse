<script setup lang="ts">
import {fetchItemsBySearch, fetchPackingList} from "~/src/dataloader";
import type {Item} from "~/src/types";
import {ExclamationTriangleIcon, HomeIcon, MagnifyingGlassIcon} from "@heroicons/vue/24/solid";

const id = useRoute().params.packinglistId;

const {data: packingList, error: packingListError} = await useAsyncData('packinglist' + id, () => fetchPackingList(id));

const packingListItems: Item[] = packingList.value?.expandedItems || [];
const allItemsList: Ref<Item[]> = ref([]);

async function addItem(item: Item) {
  try {
    if (packingListItems.map(item => item.id).includes(item.id)) {
      return;
    }
    packingListItems.push(item);

    allItemsList.value.splice(allItemsList.value.indexOf(item), 1);

    const res = await fetch('https://items.kjg-st-barbara.de/items/Packliste_item', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Packliste_id": id,
        "item_id": item.id,
      })
    });
    if (!res.ok) {
      allItemsList.value.push(item);
      packingListItems.splice(packingListItems.indexOf(item), 1);
      alert('Failed to add item');
      return;
    }
  } catch (error) {
    alert('Failed to add item:' + error);
  }
}

async function removeItem(item: Item) {
  try {
    packingListItems.splice(packingListItems.indexOf(item), 1);

    const res = await fetch('https://items.kjg-st-barbara.de/items/Packliste_item', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "query": {
          "filter": {
            "item_id": {
              "_eq": item.id
            }
          }
        }
      })
    });
    if (!res.ok) {
      packingListItems.push(item);
      alert('Failed to delete item');
      return;
    }
  } catch (error) {
    alert('Failed to delete item:' + error);
  }
}

const searchText = ref("");

async function doSearch() {
  if (searchText.value.length == 0) {
    allItemsList.value = [];
    return;
  }
  const packingListItemsIds = packingListItems.map(item => item.id);
  allItemsList.value = (await fetchItemsBySearch(searchText.value)).filter(item => !packingListItemsIds.includes(item.id));
}
</script>

<template>
  <p class="m-2 bg-error text-error-content rounded-xl p-2 text-2xl flex flex-row gap-2 items-center"
     v-if="packingListError">
    <ExclamationTriangleIcon class="h-6 w-6 text-error-content"/>
    Failed to load Packinglist
  </p>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><NuxtLink to="/">
        <HomeIcon class="h-6 w-6"/>
      </NuxtLink></li>
      <li><NuxtLink to="/packinglist">Packlisten</NuxtLink></li>
      <li>{{ packingList?.name }}</li>
    </ul>
  </div>
  <p class="text-base-content text-2xl m-2 flex-grow">{{ packingList?.name }}</p>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold"
     v-if="packingList && packingList.description">
    {{ packingList?.description }}
  </p>
  <p class="text-base-content/80 px-4 text-xl">
    {{ packingListItems.length }} Gegenstände auf der Packliste
  </p>
  <ItemList :items="packingListItems" @click="removeItem" button-text="x Entfernen" :location="false"/>
  <div class="divider"></div>
  <div class="flex flex-row flex-wrap items-center gap-4">
    <p class="text-base-content text-2xl m-2 flex-grow">Gegenstände hinzufügen</p>
    <label class="floating-label m-2">
      <span>Suche</span>
      <input type="search" placeholder="Search..." v-model="searchText"
             class="input input-secondary"
             @keydown.enter="doSearch()" @input="doSearch()"/>
    </label>
    <button @click="doSearch()" type="button" class="btn btn-primary">
      <MagnifyingGlassIcon class="h-6 w-6 text-primary-content"/>
    </button>
  </div>
  <p class="text-base-content/80 px-4 text-xl">
    {{ allItemsList.length }} Gegenstände in deiner Suche
  </p>
  <ItemList :items="allItemsList" @click="addItem" button-text="Hinzufügen" :location="true"/>
</template>

<style scoped>

</style>
