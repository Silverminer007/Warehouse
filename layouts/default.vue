<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";

const search = useRoute().query.search || "";
const searchText = ref(search);

function doSearch() {
  window.location.href = "/search?search=" + searchText.value;
}
function navigateToSearch() {
  window.location.href = "/search";
}
</script>

<template>
  <div class="flex flex-row items-center gap-2 bg-base-300 p-4">
    <a href="/">
      <img src="/logo.png" alt="icon" width="40"/>
    </a>
    <h1 class="text-base-content text-bold rounded-b-sm text-4xl flex-grow">KjG Warehouse</h1>
    <label class="floating-label m-2 sm:block hidden">
      <span>Suche</span>
      <input type="search" placeholder="Search..." v-model="searchText"
             class="input"
             @keydown.enter="doSearch()"/>
    </label>
    <button @click="doSearch()" type="button" class="btn hidden sm:block">
      <MagnifyingGlassIcon class="h-6 w-6 text-base-content"/>
    </button>
    <button @click="navigateToSearch()" type="button" class="btn block sm:hidden">
      <MagnifyingGlassIcon class="h-6 w-6 text-base-content"/>
    </button>
  </div>
  <slot/>
</template>

<style scoped>
</style>