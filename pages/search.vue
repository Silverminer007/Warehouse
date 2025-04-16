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
    <input type="search" placeholder="Search..." v-model="searchText"
           class="h-10 rounded-xl m-2 p-2 text-xl text-white border-2 border-slate-500 bg-slate-600 sm:flex-grow"
           @keydown.enter="doSearch()"/>
    <a :href="`/search?search=${searchText}`" class="text-white bg-slate-700 rounded-full py-2 px-4 m-2 text-center text-xl">
      Suchen
    </a>
  </div>
  <p class="text-slate-400 px-4 text-xl">
    {{ items.length }} Gegenstände in deiner Suche
  </p>
  <ItemList :items="items"/>
</template>

<style scoped>

</style>