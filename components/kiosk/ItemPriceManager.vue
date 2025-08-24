<script lang="ts" setup>
import {onMounted} from 'vue'
import {ArrowUpTrayIcon} from '@heroicons/vue/24/outline'
import {useKioskItems} from '~/composables/kiosk/useKioskItems'
import ItemUploadModal from './ItemImageUploadModal.vue'

const {items, currentItem, showUploadDialog, fetchItems, handleImageUpload, updatePrice} = useKioskItems()

onMounted(() => fetchItems())

function openUploadDialog(item: typeof currentItem.value) {
  currentItem.value = item
  showUploadDialog.value = true
}

async function uploadFile(file: File) {
  if (!currentItem.value) return
  await handleImageUpload(file, currentItem.value)
}
</script>

<template>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">
    Preise & Bilder
  </p>

  <ul class="list bg-base-200 rounded-box shadow-md m-6">
    <li v-for="item in items" :key="item.id" class="sm:list-row not-sm:list-item flex flex-row items-center gap-2">
      <div class="tooltip tooltip-right" data-tip="Bild hochladen oder aufnehmen">
        <button class="btn" type="button" @click="openUploadDialog(item)">
          <ArrowUpTrayIcon v-if="!item.item_image" class="w-6 h-6 text-secondary-content"/>
          <img
              v-if="item.item_image"
              :src="`https://items.kjg-st-barbara.de/assets/${item.item_image}?height=40`"
              alt="photo of the item"
              class="w-6 h-6"
          />
        </button>
      </div>

      <p class="text-base-content text-xl flex-grow">{{ item.name }}</p>

      <label class="floating-label m-2 flex flex-row">
        <span>Preis</span>
        <input
            v-model="item.price"
            class="input input-secondary"
            placeholder="Preis"
            type="text"
            @input="updatePrice(item)"
        />
      </label>
    </li>
  </ul>

  <ItemUploadModal
      v-model="showUploadDialog"
      :item="currentItem"
      @upload="uploadFile"
  />
</template>