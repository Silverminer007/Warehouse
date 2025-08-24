<script lang="ts" setup>
import {useQRCode} from "~/composables/inventory/useQRCode";

definePageMeta({
  alias: ['/shelves/:id']
})
import {useRoute} from 'vue-router'
import BoxListEntry from '~/components/inventory/Shelf/BoxListEntry.vue'
import ShelfImage from '~/components/inventory/Shelf/ShelfImage.vue'
import MoveBoxModal from '~/components/inventory/Shelf/MoveBoxModal.vue'
import AddBoxModal from "~/components/inventory/Shelf/AddBoxModal.vue";
import Breadcrumbs from "~/components/Breadcrumbs.vue";
import {ArrowsRightLeftIcon, HomeIcon} from '@heroicons/vue/24/solid'

import type {Box} from '@/types/inventory'
import {useShelfStore} from "~/stores/inventory/useShelfStore";
import {useBoxStore} from "~/stores/inventory/useBoxStore";

const id = useRoute().params.id as string

const boxStore = useBoxStore();
await boxStore.fetchBoxes();
const shelfStore = useShelfStore();
await shelfStore.fetchShelves();
shelfStore.setCurrentShelf(id);

const { createQrPdf } = useQRCode();

const selectedBox: Ref<Box | null> = ref(null);
const selectedBoxes = ref<Box[]>([])
const addBoxModal = ref(false)

async function createQRCodes() {
  const pdfBytes = await createQrPdf(
      selectedBoxes.value.map((box) => ({
        url: `https://boxes.kjg-st-barbara.de/boxes/${box.id}`,
        label: box.name,
      }))
  )

  // PDF Blob erstellen
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)

  // Download-Link simulieren
  const a = document.createElement('a')
  a.href = url
  a.download = 'qrcodes.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  // Speicher freigeben
  URL.revokeObjectURL(url)
}
</script>

<template>
  <Breadcrumbs :links="[
      {to: '/', icon: HomeIcon},
      {to: '/inventory', label: 'Inventar'},
      {to: `/rooms/${shelfStore.currentShelf?.room?.id}`, label: `${shelfStore.currentShelf?.room?.name}`},
      {label: `${shelfStore.currentShelf?.name}`}
  ]"/>

  <div class="flex flex-row gap-2">
    <div class="flex-grow">
      <p v-if="shelfStore.currentShelf?.description" class="m-2 p-4 text-info ...">
        {{ shelfStore.currentShelf.description }}</p>
    </div>
  </div>

  <div v-if="selectedBoxes.length > 0" class="fixed z-10 bottom-0 right-0 m-2 p-2 bg-base-100 rounded-lg flex flex-col gap-1">
    <p>{{ selectedBoxes.length }} Kiste(n) ausgewählt</p>
    <button class="btn btn-primary" @click="createQRCodes">QR-Code erstellen</button>
    <button class="btn btn-secondary" @click="selectedBoxes = []">Auswahl aufheben</button>
  </div>

  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">{{ shelfStore.currentShelf?.name || 'Kisten' }}</p>
  <ShelfImage :shelf="shelfStore.currentShelf || undefined"/>

  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <BoxListEntry v-for="box in boxStore.getByShelfId(id)" :key="box.id" :box="box">
      <template #left>
        <input
            type="checkbox"
            class="checkbox"
            :value="box"
            v-model="selectedBoxes"
        />
      </template>
      <button class="btn" @click="selectedBox = box">
        <ArrowsRightLeftIcon class="h-6 w-6 text-primary"/>
      </button>
    </BoxListEntry>

    <MoveBoxModal
        :visible="!!selectedBox"
        :box="selectedBox"
        @close="selectedBox = null"
    />
    <AddBoxModal :visible="addBoxModal"
                 @closeDialog="addBoxModal = false"/>
  </ul>

  <div v-if="boxStore.getByShelfId(id)?.length === 0" class="m-2 p-4 text-center text-xl text-base-content">
    Keine Kisten in diesem Regal.
    <NuxtLink class="link" to="/">Zurück zur Startseite</NuxtLink>
  </div>
  <div class="flex justify-center p-2">
    <button class="btn btn-primary" @click="addBoxModal = true">Kiste hinzufügen +
    </button>
  </div>
</template>