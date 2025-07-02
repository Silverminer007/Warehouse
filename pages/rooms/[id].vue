<script setup lang="ts">
import {fetchRoom, fetchRooms, fetchShelfsByRoom} from "~/src/dataloader";
import type {Data, Room, Shelf} from "~/src/types";
import {ArrowsRightLeftIcon, CheckCircleIcon, HomeIcon} from "@heroicons/vue/24/solid";
import ShelfListEntry from "~/components/ShelfListEntry.vue";

const id = useRoute().params.id;

const roomData = await useAsyncData('room' + id, () => fetchRoom(id));
const room: Room | undefined = !!roomData.error.value ? undefined : roomData.data.value || undefined;

const shelfData = await useAsyncData('shelfs:' + id, () => fetchShelfsByRoom(id));
const error = !!shelfData.error.value;
const shelfs: Shelf[] = error ? [] : (shelfData.data.value || []);

const roomsData = await useAsyncData('rooms', () => fetchRooms());
let rooms: Room[] = !!roomsData.error.value ? [] : roomsData.data.value || [];
if (room) {
  rooms = rooms.filter(r => r.id != room.id);
}

const imageSrc = "https://items.kjg-st-barbara.de/assets/" + room?.room_image + "?height=400";

const newShelfName = ref("");

function sortShelfs() {
  shelfs.sort((a, b) => a.name.localeCompare(b.name));
}

async function addShelf() {
  if (!newShelfName.value) {
    return;
  }
  const res = await fetch('https://items.kjg-st-barbara.de/items/Shelf', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "name": newShelfName.value,
      "room": room?.id
    })
  });
  if (res.ok) {
    const json = await res.json();
    const shelf = (json as Data).data as Shelf;
    shelf.room = room;
    shelfs.push(shelf);
  }
  newShelfName.value = "";
  sortShelfs();
}

const errorMoveShelf = ref(false);

async function moveShelf(shelf: Shelf, moveToRoom: Room) {
  const res = await fetch('https://items.kjg-st-barbara.de/items/Shelf/' + shelf.id, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "room": moveToRoom.id
    })
  });
  if (res.ok) {
    shelf.room = moveToRoom;
    shelfs.splice(shelfs.indexOf(shelf), 1);
    move_shelf.hideModal();
    errorMoveShelf.value = false;
  } else {
    errorMoveShelf.value = true;
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
      <li>{{ room?.name }}</li>
    </ul>
  </div>
  <p class="m-2 p-4 text-info rounded-xl bg-base-200 border border-dashed border-info w-fit text-bold"
     v-if="room && room.description">
    {{ room?.description }}
  </p>
  <img class="px-2" v-if="room && room.room_image" :src="imageSrc" alt="picture of the room"/>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <ShelfListEntry v-for="shelf in shelfs" :key="shelf.id" :shelf="shelf">
      <button class="btn" onclick="move_shelf.showModal()">
        <ArrowsRightLeftIcon class="h-6 w-6 text-primary"/>
      </button>
      <dialog id="move_shelf" class="modal">
        <div class="modal-box">
          <p class="text-xl">{{ shelf.name }} verschieben</p>
          <label class="floating-label m-2 flex flex-row">
            <span>Suche</span>
            <input autofocus type="search" placeholder="Search..." v-model="searchText"
                   class="input input-secondary"/>
          </label>
          <div role="alert" class="alert alert-error" v-if="errorMoveShelf">
            Das Regal konnte nicht verschoben werden
          </div>
          <ul class="list">
            <li class="list-row flex flex-row items-center gap-2" v-for="moveToRoom in rooms.filter(s =>
            s.name.toLowerCase().includes(searchText.toLowerCase()))"
                :key="moveToRoom.id">
              <span class="flex-grow text-base-content text-xl">{{ moveToRoom.name }}</span>
              <button class="btn" @click="moveShelf(shelf, moveToRoom)">
                <CheckCircleIcon class="h-6 w-6 text-primary"/>
              </button>
            </li>
          </ul>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </ShelfListEntry>
  </ul>
  <div class="flex flex-row items-center justify-center p-2">
    <button class="btn btn-primary" type="button" onclick="add_shelf.showModal()">
      Regal hinzufügen +
    </button>
  </div>
  <dialog id="add_shelf" class="modal">
    <div class="modal-box">
      <p class="text-xl">{{ 'Regal zum Raum "' + room?.name + '" hinzufügen' }}</p>
      <div class="flex flex-row items-center justify-center p-2 gap-2">
        <input type="text" class="input input-primary validator"
               minlength="1" required placeholder="Name" v-model="newShelfName">
        <button class="btn btn-primary" type="button" @click="addShelf">
          + Add
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <div v-if="shelfs.length == 0">
    <p class="text-base-content m-2 p-4 text-center text-xl">
      Keine Regale in diesem Raum.
      <NuxtLink to="/" class="link">Zurück zur Startseite</NuxtLink>
    </p>
  </div>
</template>

<style scoped>

</style>