<script lang="ts" setup>

import {HomeIcon} from "@heroicons/vue/24/solid";
import {useRoute} from 'vue-router'
import {useBoxStore} from "~/stores/inventory/useBoxStore";
import {useItemStore} from "~/stores/inventory/useItemStore";
import BoxHeader from "~/components/inventory/Box/BoxHeader.vue";
import AddItemModal from "~/components/inventory/Box/AddItemModal.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import {ref} from "vue";
import ItemListEntry from "~/components/inventory/Box/ItemListEntry.vue";

definePageMeta({
  alias: ['/boxes/:id']
})

const route = useRoute()
const id = route.params.id as string

const itemStore = useItemStore()
await itemStore.fetchItems();
const boxStore = useBoxStore()
await boxStore.fetchBoxes();
boxStore.setCurrentBox(id);

const addItemModal = ref(false)
</script>

<template>
  <Breadcrumbs :links="[
      {to: '/', icon: HomeIcon},
      { to: '/inventory', label: 'Inventar'},
      { to: `/inventory/rooms/${boxStore.currentBox?.shelf?.room?.id}`, label: `${boxStore.currentBox?.shelf?.room?.name}`},
      { to: `/inventory/shelves/${boxStore.currentBox?.shelf?.id}`, label: `${boxStore.currentBox?.shelf?.name}`},
      { label: `${boxStore.currentBox?.name}`}
  ]"/>
  <BoxHeader/>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">{{
      boxStore.currentBox?.name || 'Gegenstände'
    }}</p>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <li v-for="item in itemStore.getByBoxId(boxStore.currentBox?.id || -1) || []" :key="item.id"
        class="flex flex-row items-center">
      <ItemListEntry :item="item" :location="false" :editable="true" class="flex-grow"/>
    </li>
  </ul>
  <AddItemModal
      v-model:visible="addItemModal"
      @closeDialog="addItemModal = false"
  />
  <div v-if="itemStore.getByBoxId(id)?.length === 0" class="m-2 p-4 text-center text-xl text-base-content">
    Keine Gegenstände in dieser Kiste.
    <NuxtLink class="link" to="/">Zurück zur Startseite</NuxtLink>
  </div>
  <div class="flex justify-center p-2">
    <button class="btn btn-primary" @click="addItemModal = true">Item hinzufügen +
    </button>
  </div>
</template>