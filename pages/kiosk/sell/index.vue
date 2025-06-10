<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/solid";
import {getPersons, searchPersons} from "~/src/dataloader";
import type {Person} from "~/src/types";

const personData = await useAsyncData('persons', () => getPersons());
const persons: Ref<Person[]> = ref(!!personData.error.value ? [] : (personData.data.value || []));

const searchText = ref("");

async function doSearch() {
  persons.value = await searchPersons(searchText.value);
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
      <li>
        <NuxtLink to="/kiosk">Kiosk</NuxtLink>
      </li>
      <li>Verkaufen</li>
    </ul>
  </div>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
    Kiosk - Verkaufen an
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
    <li class="list-row flex" v-for="person in persons" :key="person.id" :person="person">
      <NuxtLink :to="'/kiosk/sell/' + person.id">
        <p class="text-base-content text-xl flex-grow">{{ person.firstname }} {{ person.lastname }}
          ({{ (Math.round(person.balance * 100) / 100).toFixed(2) }} €)</p>
      </NuxtLink>
    </li>
  </ul>
</template>

<style scoped>

</style>