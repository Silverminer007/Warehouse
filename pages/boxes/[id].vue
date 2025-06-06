<script setup lang="ts">
import {fetchBox, fetchItemsByBox} from "~/src/dataloader";
import type {Item, Box, Data} from "~/src/types";
import {HomeIcon} from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const boxData = await useAsyncData('box' + id, () => fetchBox(id));
const box: Box | undefined = !!boxData.error.value ? undefined : boxData.data.value || undefined;

const itemData = await useAsyncData('items:' + id, () => fetchItemsByBox(id));
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const shelfId: number | undefined = box?.shelf?.id;

const shelfHref = shelfId ? "/shelfs/" + shelfId : "/";
const roomHref = "/rooms/" + box?.shelf?.room?.id;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=400";

const newItemAmount = ref(1);
const newItemName = ref("");
const deletedItem : Ref<Item | null> = ref(null);

function sortItems() {
  items.sort((a, b) => a.name.localeCompare(b.name));
}

async function addItem() {
  if (!newItemName.value || newItemAmount.value < 1) {
    return;
  }
  const res = await fetch('https://items.kjg-st-barbara.de/items/item', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": newItemName.value,
      "amount": newItemAmount.value,
      "box": box?.id
    })
  });
  if (res.ok) {
    const json = await res.json();
    const item = (json as Data).data as Item;
    item.box = box;
    items.push(item);
  }
  newItemName.value = "";
  sortItems();
}

async function deleteItem(item: Item) {
  try {
    items.splice(items.indexOf(item), 1);

    const res = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      items.push(item);
      console.log(res);
      alert('Failed to delete item');
      return;
    }
    deletedItem.value = item;
  } catch (error) {
    alert('Failed to delete item:' + error);
  }
}

async function undoDelete() {
  if(!deletedItem.value) {
    return;
  }
  items.push(deletedItem.value);
  const res = await fetch('https://items.kjg-st-barbara.de/items/item/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deletedItem.value)
  });
  if (!res.ok) {
    console.log(res);
    alert('Undo delete item failed');
    return;
  }
  deletedItem.value = null;
  sortItems();
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
        <NuxtLink :to="roomHref">{{ box?.shelf?.room?.name }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="shelfHref">{{ box?.shelf?.name }}</NuxtLink>
      </li>
      <li>{{ box?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold"
     v-if="box && box.description">
    {{ box?.description }}
  </p>
  <img class="px-2" v-if="box && box.image" :src="imageSrc" alt="picture of the box"/>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <div v-for="item in items" :key="item.id" class="flex flex-row items-center">
      <ItemListEntry :item="item" class="flex-grow" location=true>
        <button class="btn" @click="deleteItem(item)">x</button>
      </ItemListEntry>
    </div>
  </ul>
  <div v-if="items.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal.
      <NuxtLink :to="shelfHref"
                class="link">{{
          shelfId ? "Zurück zum Raum" : "Zurück zur Startseite"
        }}
      </NuxtLink>
    </p>
  </div>
  <div class="flex flex-row items-center justify-center p-2">
    <button class="btn btn-primary" type="button" onclick="my_modal_1.showModal()">
      Item hinzufügen +
    </button>
  </div>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <p class="text-xl">{{ 'Items zur Kiste "' + box.name + '" hinzufügen' }}</p>
      <div class="flex flex-row items-center justify-center p-2 gap-2">
        <input type="number" class="input input-primary w-16 validator"
               placeholder="Anzahl"
               required min="1" v-model="newItemAmount">
        <input type="text" class="input input-primary validator"
               minlength="1" required placeholder="Name" v-model="newItemName">
        <button class="btn btn-primary" type="button" @click="addItem">
          + Add
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <div class="toast" v-if="deletedItem">
    <div class="alert alert-warning">
      {{ deletedItem?.name }} wurde gelöscht
      <button class="btn" @click="undoDelete">Rückgängig</button>
      <button class="btn" @click="deletedItem = null">x</button>
    </div>
  </div>
  <div class="flex flex-row justify-center w-full">
    <p class="btn btn-primary">
      + Weiteres Item
    </p>
  </div>
</template>

<style scoped>

</style>