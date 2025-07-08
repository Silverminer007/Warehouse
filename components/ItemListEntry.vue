<script setup lang="ts">
import type {Item} from "~/src/types";

const {item, location} = defineProps<{
  item: Item,
  location: Boolean | boolean
}>();

const itemDetailsDialog = ref<boolean>(false);

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + item?.item_image + "?height=40";
const largeImageSrc = "https://items.kjg-st-barbara.de/assets/" + item?.item_image + "?height=400";

async function addOne() {
  item.amount++;
  const res = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "amount": item.amount
    })
  });
  if (!res.ok) {
    item.amount--;
    console.log(res);
    window.alert("Netzwerkfehler. Die Menge konnte nicht geändert werden")
  }
}

async function minusOne() {
  if (item.amount <= 1) {
    return;
  }
  item.amount--;
  const res = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "amount": item.amount
    })
  });
  if (!res.ok) {
    item.amount++;
    console.log(res);
    window.alert("Netzwerkfehler. Die Menge konnte nicht geändert werden")
  }
}
</script>

<template>
  <li class="list-row flex items-center justify-items">
    <div class="flex flex-col gap-1 flex-grow">
      <div class="flex flex-row items-center gap-2">
        <div class="flex flex-row justify-center items-center gap-1">
          <button type="button" :class="'btn btn-secondary btn-sm ' + (item.amount <= 1 ? 'btn-disabled' : '')"
                  @click="minusOne">-
          </button>
          <p class="text-base-content min-w-4">{{ item.amount }}x</p>
          <button type="button" class="btn btn-secondary btn-sm" @click="addOne">+</button>
        </div>
        <img class="" v-if="item && item.item_image" :src="imageSrc" alt="photo of the item"/>
        <p class="text-base-content text-xl" @click="itemDetailsDialog = true">{{ item.name }}</p>
      </div>
      <div v-if="itemDetailsDialog" class="modal modal-open">
        <div class="modal-box">
          <p class="text-xl font-bold py-2">Hier findest du {{ item.name }}:</p>
          <div v-if="item?.box?.shelf?.room && location">
            <div class="badge badge-neutral">
              {{ item.box?.shelf?.room?.name }}
            </div>
            >
            <div class="badge badge-neutral">
              {{ item.box?.shelf?.name }}
            </div>
            >
            <div class="badge badge-neutral">
              {{ item.box?.name }}
            </div>
          </div>
          <img class="" v-if="item && item.item_image" :src="largeImageSrc" alt="photo of the item"/>
        </div>
        <div class="modal-action">
          <button class="btn" @click="itemDetailsDialog = false">Schließen</button>
        </div>
      </div>

      <div class="modal-backdrop" @click="itemDetailsDialog = false"></div>
    </div>
    <slot/>
  </li>
</template>

<style scoped>
</style>