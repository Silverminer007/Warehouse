<script setup lang="ts">
import {PlusIcon, XMarkIcon} from "@heroicons/vue/24/solid";
import type {Box} from "~/src/types";
import {getKioskBoxes} from "~/src/dataloader";

const boxData = await useAsyncData('kiosk-boxes', () => getKioskBoxes());
const boxes: Ref<Box[]> = ref(!!boxData.error.value ? [] : (boxData.data.value || []));

async function removeBox(box: Box) {
  const response = await fetch('https://items.kjg-st-barbara.de/items/Box/' + box.id, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      kiosk: false
    }),
  });
  if (response.ok) {
    boxes.value.splice(boxes.value.indexOf(box), 1);
  }
}

async function updateBoxes() {
  const boxData = await useAsyncData('kiosk-boxes', () => getKioskBoxes());
  boxes.value = !!boxData.error.value ? [] : (boxData.data.value || []);
}
</script>

<template>
  <div
      class="bg-secondary text-2xl text-secondary-content rounded-xl p-2 my-2 flex flex-row items-center justify-center">
    <p class="flex-grow">Kiosk Kisten</p>
    <div onclick="add_kiosk_box_modal.showModal()">
      <PlusIcon class="h-8 w-8"/>
    </div>
  </div>
  <dialog id="add_kiosk_box_modal" class="modal">
    <div class="modal-box">
      <SearchKioskBoxModal/>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="updateBoxes">close</button>
    </form>
  </dialog>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <BoxListEntry v-for="box in boxes" :key="box.id" :box="box">
      <button type="button" @click="removeBox(box)">
        <XMarkIcon class="h-6 w-6 text-base-content"/>
      </button>
    </BoxListEntry>
  </ul>
</template>

<style scoped>

</style>