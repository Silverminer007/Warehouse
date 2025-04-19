<script setup lang="ts">
import {fetchItemsBySearch} from "~/src/dataloader";
import ItemList from "~/components/ItemList.vue";
import type {Item} from "~/src/types";

const search = useRoute().query.search || "";
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
  <ItemList :items="items"/>
</template>

<style scoped>

</style>