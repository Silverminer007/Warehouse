<script setup lang="ts">
import {fetchBox, fetchBoxes, fetchItemsByBox} from "~/src/dataloader";
import type {Box, Data, Item} from "~/src/types";
import {ArrowsRightLeftIcon, CheckCircleIcon, HomeIcon} from "@heroicons/vue/24/solid";

const id = useRoute().params.id;

const boxData = await useAsyncData('box' + id, () => fetchBox(id));
const box: Box | undefined = !!boxData.error.value ? undefined : boxData.data.value || undefined;

const itemData = await useAsyncData('items:' + id, () => fetchItemsByBox(id));
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const boxesData = await useAsyncData('boxes', () => fetchBoxes());
const boxes: Box[] = (!!boxesData.error.value ? [] : (boxesData.data.value || [])).filter(b => b.id != box?.id);

const shelfId: number | undefined = box?.shelf?.id;

const shelfHref = shelfId ? "/shelfs/" + shelfId : "/";
const roomHref = "/rooms/" + box?.shelf?.room?.id;

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + box?.image + "?height=400";

const newItemAmount = ref(1);
const newItemName = ref("");
const deletedItem: Ref<Item | null> = ref(null);

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
  if (!deletedItem.value) {
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

const errorMoveItem = ref(false);

async function moveItem(item: Item, moveToBox: Box) {
  const res = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "box": moveToBox.id
    })
  });
  if (res.ok) {
    item.box = moveToBox;
    items.splice(items.indexOf(item), 1);
    move_item.hideModal();
    errorMoveItem.value = false;
  } else {
    errorMoveItem.value = true;
  }
}

const searchText = ref("");
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
      <ItemListEntry :item="item" class="flex-grow" :location=true>
        <button class="btn" onclick="move_item.showModal()">
          <ArrowsRightLeftIcon class="h-6 w-6 text-primary"/>
        </button>
        <dialog id="move_item" class="modal">
          <div class="modal-box">
            <p class="text-xl">{{ item.name }} verschieben</p>
            <label class="floating-label m-2 flex flex-row">
              <span>Suche</span>
              <input autofocus type="search" placeholder="Search..." v-model="searchText"
                     class="input input-secondary"/>
            </label>
            <div role="alert" class="alert alert-error" v-if="errorMoveItem">
              Der Gegenstand konnte nicht verschoben werden
            </div>
            <ul class="list">
              <li class="list-row flex flex-row items-center gap-2" v-for="moveToBox in boxes.filter(s =>
          s.name.toLowerCase().includes(searchText.toLowerCase()))"
                  :key="moveToBox.id">
              <span class="flex-grow text-base-content text-xl">{{ moveToBox.name}}</span>
                <button class="btn" @click="moveItem(item, moveToBox)">
                  <CheckCircleIcon class="h-6 w-6 text-primary"/>
                </button>
              </li>
            </ul>
          </div>
          <form method="dialog" class="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
</template>

<style scoped>

</style>