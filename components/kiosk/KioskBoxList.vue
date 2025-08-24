<template>
  <div class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2 flex flex-row items-center justify-center">
    <p class="flex-grow">Kiosk Kisten</p>
    <button @click="addBoxModal.showModal">
      <PlusIcon class="h-8 w-8"/>
    </button>
  </div>

  <dialog ref="addBoxModal" class="modal">
    <div class="modal-box">
      <SearchKioskBoxModal/>
    </div>
    <form class="modal-backdrop" method="dialog">
      <button @click="loadBoxes">Schließen</button>
    </form>
  </dialog>

  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <BoxListEntry v-for="box in kioskBoxes" :key="box.id" :box="box">
      <button type="button" @click="removeBox(box)">
        <XMarkIcon class="h-6 w-6 text-base-content"/>
      </button>
    </BoxListEntry>
  </ul>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {PlusIcon, XMarkIcon} from '@heroicons/vue/24/solid'
import BoxListEntry from './BoxListEntry.vue'
import SearchKioskBoxModal from './SearchKioskBoxModal.vue'
import {useKioskBoxes} from '@/composables/kiosk/useKioskBoxes'

const {kioskBoxes, loadBoxes, removeBox} = await useKioskBoxes()
const addBoxModal = ref<HTMLDialogElement>()
</script>