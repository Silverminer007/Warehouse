<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";
import {useSearch} from "~/composables/search/useSearch";
import ItemListEntry from "~/components/inventory/Box/ItemListEntry.vue";
import {usePackingListStore} from "~/stores/packinglists/usePackingListStore";

const props = defineProps<{
  packinglistId: number;
}>();

const {searchText, doSearch, items} = await useSearch();
const filteredItems = computed(() => {
  const packingListItems = store.getById(props.packinglistId)?.expandedItems.map((item) => item.id);
  return items.value.filter(i => !packingListItems.includes(i.id));
})
const store = usePackingListStore();
store.loadPackingListById(props.packinglistId);
</script>

<template>
  <div>
    <div class="flex flex-row flex-wrap items-center gap-4">
      <p class="text-base-content text-2xl m-2 flex-grow">Gegenstände hinzufügen</p>
      <label class="floating-label m-2">
        <span>Suche</span>
        <input
            type="search"
            placeholder="Search..."
            v-model="searchText"
            class="input input-secondary"
            @keydown.enter.prevent="doSearch"
            @input="doSearch"
        />
      </label>
      <button @click="search" type="button" class="btn btn-primary">
        <MagnifyingGlassIcon class="h-6 w-6 text-primary-content"/>
      </button>
    </div>

    <p class="text-base-content/80 px-4 text-xl">
      {{ filteredItems.length }} Gegenstände in deiner Suche
    </p>

    <ul class="list bg-base-200 rounded-box shadow-md m-6">
      <li v-for="item in filteredItems" :key="item.id" class="flex flex-row items-center">
        <ItemListEntry :item="item" :location="false" class="flex-grow">
          <button class="btn btn-primary" @click="store.addItemToList(props.packinglistId, item)">
            Hinzufügen
          </button>
        </ItemListEntry>
      </li>
    </ul>
  </div>
</template>