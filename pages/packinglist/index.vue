<script setup lang="ts">
import {fetchPackingLists} from "~/src/dataloader";
import type {PackingList} from "~/src/types";
import { HomeIcon } from "@heroicons/vue/24/solid";

const packingListData = await useAsyncData('packinglists', () => fetchPackingLists());
const packingLists: PackingList[] = !!packingListData.error.value ? [] : packingListData.data.value || [];
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><a href="/"><HomeIcon class="h-6 w-6" /></a></li>
      <li>Packlisten</li>
    </ul>
  </div>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Packlisten
  </p>
  <PackingListList :packing-lists="packingLists"/>
</template>

<style scoped>

</style>