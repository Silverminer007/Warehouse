<script setup lang="ts">
import {fetchItemsBySearch} from "~/src/dataloader";
import ItemList from "~/components/ItemList.vue";
import type {Item} from "~/src/types";

const search = useRoute().query.search || "";

const itemData = await useAsyncData('items-search:' + search, () => fetchItemsBySearch(search));
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const searchText = ref(search);

function doSearch() {
  window.location.href = "/search?search=" + searchText.value;
}
</script>

<template>
  <div class="w-full p-2 flex-col flex sm:flex-row">
    <label class="floating-label m-2 flex-grow flex flex-row sm:hidden">
      <span>Suche</span>
      <input type="search" placeholder="Search..." v-model="searchText"
             class="input input-secondary flex-grow"
             @keydown.enter="doSearch()"/>
    </label>
    <button @click="doSearch" class="btn btn-primary m-2 sm:hidden">
      Suchen
    </button>
  </div>
  <p class="text-base-content/80 px-4 text-xl">
    {{ items.length }} Gegenstände in deiner Suche
  </p>
  <ItemList :items="items"/>
</template>

<style scoped>

</style>