<script lang="ts" setup>
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";
import appIcon from '~/assets/images/logo.png'
import PullToRefresh from "pulltorefreshjs"
import {useItemStore} from "~/stores/inventory/useItemStore";
import {useBoxStore} from "~/stores/inventory/useBoxStore";
import {useShelfStore} from "~/stores/inventory/useShelfStore";
import {useRoomStore} from "~/stores/inventory/useRoomStore";

const itemStore = useItemStore();
const boxStore = useBoxStore();
const shelfStore = useShelfStore();
const roomStore = useRoomStore();

onMounted(() => {
  itemStore.fetchItems(false);
  boxStore.fetchBoxes(false);
  shelfStore.fetchShelves(false);
  roomStore.fetchRooms(false);

  PullToRefresh.init({
    mainElement: "body", // oder ein Wrapper-Div
    onRefresh() {
      console.log("Reloading Data");
      itemStore.fetchItems(true);
      boxStore.fetchBoxes(true);
      shelfStore.fetchShelves(true);
      roomStore.fetchRooms(true);
    }
  })
})
</script>

<template>
  <div class="flex flex-row items-center gap-2 bg-base-300 p-4">
    <NuxtLink class="flex-grow flex flex-row gap-2 items-center" to="/">
      <img :src="appIcon" alt="KjG Warehouse Logo" width="40"/>
      <h1 class="text-base-content font-bold text-4xl">KjG Warehouse</h1>
      <span v-if="itemStore.isLoading || boxStore.isLoading || itemStore.isLoading || roomStore.isLoading"
          class="loading loading-spinner loading-xl"></span>
    </NuxtLink>
    <NuxtLink class="btn btn-primary" to="/search">
      <MagnifyingGlassIcon class="h-6 w-6 text-primary-content"/>
    </NuxtLink>
  </div>
  <slot/>
</template>