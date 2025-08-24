<script setup lang="ts">
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import PackinglistSearch from "~/components/packinglists/PackinglistSearch.vue";
import PackinglistItems from "~/components/packinglists/PackinglistItems.vue";
import {usePackingListStore} from "~/stores/packinglists/usePackingListStore";

const route = useRoute();
const idParam = route.params.id as string
const id = Number(idParam)
if (isNaN(id) || id <= 0) {
  throw createError({statusCode: 404, statusMessage: 'Invalid ID'})
}

const store = usePackingListStore();
await store.loadPackingListById(id)
const packingList = store.getById(id);
</script>

<template>
  <p v-if="store.error"
     class="m-2 bg-error text-error-content rounded-xl p-2 text-2xl flex flex-row gap-2 items-center">
    Fehler beim Laden der Packliste
  </p>

  <Breadcrumbs :links="[
    { to: '/', icon: HomeIcon },
    { to: '/packinglists', label: 'Packlisten' },
    { label: packingList?.name }
  ]"/>

  <div class="flex-grow flex flex-row m-2">
    <p class="text-base-content text-2xl m-2 flex-grow">{{ packingList?.name }}</p>
    <a class="btn btn-primary" :href="`https://items.kjg-st-barbara.de/warehouse/api/v1/packliste/${id}`">
      Export PDF
    </a>
  </div>

  <p v-if="packingList?.description"
     class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit font-bold">
    {{ packingList.description }}
  </p>

  <p class="text-base-content/80 px-4 text-xl">
    {{ packingList?.expandedItems.length }} Gegenstände auf der Packliste
  </p>

  <PackinglistItems :items="packingList?.expandedItems" :packinglist-id="id"/>

  <div class="divider"></div>

  <PackinglistSearch :packinglist-id="id"/>
</template>