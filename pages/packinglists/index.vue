<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/solid'
import PackingListListEntry from "~/components/packinglists/PackingListListEntry.vue";
import {usePackingListStore} from "~/stores/packinglists/usePackingListStore";

// Daten laden
const store = usePackingListStore();
await store.loadPackingLists();
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6" />
        </NuxtLink>
      </li>
      <li>Packlisten</li>
    </ul>
  </div>

  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Packlisten
  </p>

  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <PackingListListEntry
        v-for="packingList in store.packingLists"
        :key="packingList.id"
        :packing-list="packingList"
    />
  </ul>

  <p v-if="error" class="text-error m-2">Fehler beim Laden der Packlisten</p>
</template>