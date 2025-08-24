<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/solid";
import SearchBar from "~/components/search/SearchBar.vue";
import SearchResultList from "~/components/search/SearchResultList.vue";
import {useItemStore} from "~/stores/inventory/useItemStore";

const itemStore = useItemStore();
const searchText = ref<string>("");

// Pagination state
const currentPage = ref(1);
const pageSize = 50; // Anzahl der Items pro Seite

const items = computed(() => itemStore.getBySearch(searchText.value) || []);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return items.value.slice(start, start + pageSize);
});

const totalPages = computed(() => Math.ceil(items.value.length / pageSize));

async function search() {
  history.replaceState({}, "", "/search?search=" + searchText.value);
  currentPage.value = 1; // bei neuer Suche zurück auf Seite 1
}

function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>


<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6"/>
        </NuxtLink>
      </li>
      <li>Suche</li>
    </ul>
  </div>

  <div class="w-full p-2 flex-col flex sm:flex-row flex-wrap">
    <p class="text-base-content text-2xl m-2 flex-grow hidden sm:block">
      Gegenstände suchen
    </p>
    <SearchBar v-model="searchText" @search="search"/>
  </div>

  <div class="flex flex-row gap-2 items-center">
    <p class="text-base-content/80 px-4 text-xl flex-grow">
      {{ items.length }} Gegenstände in deiner Suche
    </p>
    <div v-if="totalPages > 1" class="join flex justify-center mr-4">
      <button class="join-item btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
        «
      </button>
      <button @click="goToPage(currentPage)" class="join-item btn">
        Seite {{ currentPage }}
      </button>
      <button class="join-item btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
        »
      </button>
    </div>
  </div>

  <SearchResultList :items="paginatedItems"/>

  <!-- Pagination -->
  <div v-if="totalPages > 1" class="join flex justify-center mt-4">
    <button class="join-item btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">
      «
    </button>
    <button @click="goToPage(currentPage)" class="join-item btn">
      Seite {{ currentPage }}
    </button>
    <button class="join-item btn" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">
      »
    </button>
  </div>
</template>