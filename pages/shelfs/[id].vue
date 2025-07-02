<script setup lang="ts">
import {fetchBoxesByShelf, fetchShelf, fetchShelfs} from "~/src/dataloader";
import type {Box, Data, Shelf} from "~/src/types";
import {ArrowsRightLeftIcon, CheckCircleIcon, HomeIcon} from "@heroicons/vue/24/solid";
import BoxListEntry from "~/components/BoxListEntry.vue";

const id = useRoute().params.id;

const shelfData = await useAsyncData('shelf' + id, () => {
  return fetchShelf(id);
});
const shelf: Shelf | undefined = !!shelfData.error.value ? undefined : shelfData.data.value || undefined;

const boxData = await useAsyncData('boxes:' + id, () => fetchBoxesByShelf(id));
const error = !!boxData.error.value;
const boxes: Box[] = error ? [] : (boxData.data.value || []);

const shelfsData = await useAsyncData('shelfs', () => fetchShelfs());
const shelfs: Shelf[] = (!!shelfsData.error.value ? [] : (shelfsData.data.value || []))
    .filter(s => s.id != shelf?.id);

const roomHref = "/rooms/" + shelf?.room?.id;

const roomsOverviewHref = shelf?.room ? "/rooms/" + shelf?.room.id : "/";

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + shelf?.shelf_image + "?height=400";

function sortBoxes() {
  boxes.sort((a, b) => a.name.localeCompare(b.name));
}

const newBoxName = ref("");

async function addBox() {
  if (!newBoxName.value) {
    return;
  }
  const res = await fetch('https://items.kjg-st-barbara.de/items/Box', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": newBoxName.value,
      "shelf": shelf?.id
    })
  });
  if (res.ok) {
    const json = await res.json();
    const box = (json as Data).data as Box;
    box.shelf = shelf;
    boxes.push(box);
  }
  newBoxName.value = "";
  sortBoxes();
}

const errorMoveBox = ref(false);

async function moveBox(box: Box, moveToShelf: Shelf) {
  const res = await fetch('https://items.kjg-st-barbara.de/items/Box/' + box.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "shelf": moveToShelf.id
    })
  });
  if (res.ok) {
    box.shelf = moveToShelf;
    boxes.splice(boxes.indexOf(box), 1);
    move_box.hideModal();
    errorMoveBox.value = false;
  } else {
    errorMoveBox.value = true;
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
        <NuxtLink :to="roomHref">{{ shelf?.room?.name }}</NuxtLink>
      </li>
      <li>{{ shelf?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold"
     v-if="shelf && shelf.description">
    {{ shelf?.description }}
  </p>
  <img class="px-2" v-if="shelf && shelf.shelf_image" :src="imageSrc" alt="picture of the shelf"/>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <BoxListEntry v-for="box in boxes" :key="box.id" :box="box">
      <button class="btn" onclick="move_box.showModal()">
        <ArrowsRightLeftIcon class="h-6 w-6 text-primary"/>
      </button>
      <dialog id="move_box" class="modal">
        <div class="modal-box">
          <p class="text-xl">{{ box.name }} verschieben</p>
          <label class="floating-label m-2 flex flex-row">
            <span>Suche</span>
            <input autofocus type="search" placeholder="Search..." v-model="searchText"
                   class="input input-secondary"/>
          </label>
          <div role="alert" class="alert alert-error" v-if="errorMoveBox">
            Die Kiste konnte nicht verschoben werden
          </div>
          <ul class="list">
            <li class="list-row flex flex-row items-center gap-2" v-for="moveToShelf in shelfs.filter(s =>
          s.name.toLowerCase().includes(searchText.toLowerCase()))"
                :key="moveToShelf.id">
              <span class="flex-grow text-base-content text-xl">{{ moveToShelf.room?.name }} > {{
                  moveToShelf.name
                }}</span>
              <button class="btn" @click="moveBox(box, moveToShelf)">
                <CheckCircleIcon class="h-6 w-6 text-primary"/>
              </button>
            </li>
          </ul>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </BoxListEntry>
  </ul>
  <div v-if="boxes.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Kisten in diesem Regal.
      <NuxtLink :to="roomsOverviewHref"
                class="link">{{ shelf?.room?.id ? "Zurück zum Raum" : "Zurück zur Startseite" }}
      </NuxtLink>
    </p>
  </div>
  <div class="flex flex-row items-center justify-center p-2">
    <button class="btn btn-primary" type="button" onclick="my_modal_1.showModal()">
      Kiste hinzufügen +
    </button>
  </div>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <p class="text-xl">{{ 'Kiste zum Regal "' + shelf?.name + '" hinzufügen' }}</p>
      <div class="flex flex-row items-center justify-center p-2 gap-2">
        <input type="text" class="input input-primary validator"
               minlength="1" required placeholder="Name" v-model="newBoxName">
        <button class="btn btn-primary" type="button" @click="addBox">
          + Add
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style scoped>

</style>