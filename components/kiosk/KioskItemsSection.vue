<script setup lang="ts">
import {getKioskItemsWithAndWithoutPrice} from "~/src/dataloader"
import {ArrowUpTrayIcon} from "@heroicons/vue/24/outline"
import type {Item} from "~/src/types"
import {patchItemImage, updateItemPrice, uploadImageToDirectus} from '~/api/kiosk/directus'

const showUploadDialog = ref<boolean>(false);

const itemData = await useAsyncData('kiosk-items', getKioskItemsWithAndWithoutPrice)
const error = !!itemData.error.value
const items: Ref<Item[]> = ref(error ? [] : (itemData.data.value || []))

async function updatePrice(item: Item) {
  try {
    await updateItemPrice(item)
  } catch (err) {
    alert('Fehler beim Speichern')
    await updateItems()
  }
}

async function updateItems() {
  items.value = await getKioskItemsWithAndWithoutPrice()
}

async function handleImageUpload(e: Event, item: Item) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !item) return

  try {
    const fileId = await uploadImageToDirectus(file)
    await patchItemImage(item.id, fileId)
    await updateItems()
  } catch (err) {
    alert('Fehler beim Upload oder Speichern')
  }
}
</script>

<template>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Preise & Bilder
  </p>
  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <li v-for="item in items" :key="item.id" class="sm:list-row not-sm:list-item">
      <button type="button" class="btn" @click="showUploadDialog = true">
        <ArrowUpTrayIcon v-if="!(item && item.item_image)" class="w-6 h-6 text-secondary-content"/>
        <img v-if="item && item.item_image" class="w-6 h-6"
             :src="'https://items.kjg-st-barbara.de/assets/' + item?.item_image + '?height=40'"
             alt="photo of the item"/>
      </button>
      <p class="text-base-content text-xl flex-grow">{{ item.name }}</p>
      <label class="floating-label m-2 flex flex-row">
        <span>Preis</span>
        <input type="text" placeholder="Preis" v-model="item.price"
               class="input input-secondary" @input="updatePrice(item)"/>
      </label>

      <!-- Upload Modal -->
      <div class="modal modal-open" v-if="showUploadDialog">
        <div class="modal-box">
          <p class="text-xl font-bold">{{ item?.name }}</p>

          <img v-if="item?.item_image"
               :src="`https://items.kjg-st-barbara.de/assets/${item.item_image}?height=100`"
               class="my-2" alt=""/>

          <div v-else class="alert alert-warning">Kein Bild vorhanden</div>

          <input
              type="file"
              accept="image/*"
              class="file-input w-full mt-4"
              capture="environment"
              @change="handleImageUpload($event, item)"/>
          <div class="modal-action">
            <button class="btn" @click="showUploadDialog = false">Schließen</button>
          </div>
        </div>
        <div class="modal-backdrop" @click="showUploadDialog = false"></div>
      </div>
    </li>
  </ul>
</template>

<style scoped>

</style>