<script setup lang="ts">
import Breadcrumbs from "~/components/kiosk/KioskBreadcrumbs.vue";
import SellPersonSearch from "~/components/kiosk/SellPersonSearch.vue";
import SellPersonList from "~/components/kiosk/SellPersonList.vue";
import { usePersonSearch } from "~/composables/kiosk/usePersonSearch";

const { persons, searchText, doSearch } = await usePersonSearch();
</script>

<template>
  <Breadcrumbs />

  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
    Kiosk - Verkaufen an
  </p>

  <SellPersonSearch v-model="searchText" @search="doSearch" />

  <SellPersonList :persons="persons" />
</template>