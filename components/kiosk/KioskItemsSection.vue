<script setup lang="ts">
import {getKioskItemsWithAndWithoutPrice} from "~/src/dataloader";
import type {Item} from "~/src/types";

const itemData = await useAsyncData('kiosk-items-without-price', () => getKioskItemsWithAndWithoutPrice());
const error = !!itemData.error.value;
const items: Ref<Item[]> = ref(error ? [] : (itemData.data.value || []));

async function updatePrice(item: Item) {
  const response = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      price: item.price,
    })
  });
  if (!response.ok) {
    window.alert("Netzwerkfehler, der Preis konnte nicht gespeichert werden");
    updateItems();
  }
}

async function updateItems() {
  items.value = await getKioskItemsWithAndWithoutPrice();
}
</script>

<template>
  <p class="bg-secondary text-2xl text-secondary-content rounded-xl p-2">
    Preise & Bilder
  </p>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <div v-for="item in items" :key="item.id" class="flex flex-row items-center">
      <li :item="item" :location=true class="flex flex-row items-center flex-grow">
        <img class="" v-if="item && item.item_image" :src="'https://items.kjg-st-barbara.de/assets/' + item?.item_image + '?height=40'" alt="photo of the item"/>
        <p class="text-base-content text-xl flex-grow" onclick="item_detail_modal.showModal()">{{ item.name }}</p>
        <label class="floating-label m-2 flex flex-row">
          <span>Preis</span>
          <input type="text" placeholder="Preis" v-model="item.price"
                 class="input input-secondary" @input="updatePrice(item)"/>
        </label>
      </li>
    </div>
  </ul>
</template>

<style scoped>

</style>