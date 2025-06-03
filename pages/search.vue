<script setup lang="ts">
import {fetchItemsBySearch} from "~/src/dataloader";
import type {Item} from "~/src/types";

const search : string = useRoute().query.search || "";
const searchText: Ref<string> = ref(search);

const items: Ref<Item[]> = ref([]);
if (search.length > 0) {
  const itemData = await useAsyncData('items-search:' + search, () => fetchItemsBySearch(searchText.value));
  if (!itemData.error.value) {
    items.value = itemData.data.value || [];
  }
}

async function doSearch() {
  history.replaceState({}, "", "/search?search=" + searchText.value);
  if (searchText.value.length == 0) {
    items.value = [];
    return;
  }
  items.value = await fetchItemsBySearch(searchText.value);
}
</script>

<template>
  <div class="w-full p-2 flex-col flex sm:flex-row flex-wrap">
    <p class="text-base-content text-2xl m-2 flex-grow hidden sm:block">Gegenstände suchen</p>
    <label class="floating-label m-2 flex flex-row">
      <span>Suche</span>
      <input type="search" placeholder="Search..." v-model="searchText"
             class="input input-secondary"
             @keydown.enter="doSearch()" @input="doSearch"/>
    </label>
    <button @click="doSearch" class="btn btn-primary m-2">
      Suchen
    </button>
  </div>
  <p class="text-base-content/80 px-4 text-xl">
    {{ items.length }} Gegenstände in deiner Suche
  </p>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <div v-for="item in items" :key="item.id" class="flex flex-row items-center">
      <ItemListEntry :item="item" class="flex-grow" :location="true"/>
    </div>
  </ul>
</template>

<style scoped>

</style>