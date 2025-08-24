<!-- components/inventory/ItemListEntry.vue -->
<script lang="ts" setup>
import type {Item} from '~/types/inventory'
import {useItemStore} from "~/stores/inventory/useItemStore";
import {CameraIcon, EllipsisVerticalIcon, TrashIcon} from "@heroicons/vue/24/outline";
import {ArrowsRightLeftIcon, PencilIcon} from "@heroicons/vue/24/solid";
import MoveItemModal from "~/components/inventory/Box/MoveItemModal.vue";
import {ref} from "vue";
import EditItemAmount from "~/components/inventory/Box/EditItemAmount.vue";
import ItemLocation from "~/components/inventory/Box/ItemLocation.vue";
import EditItemModal from "~/components/inventory/Box/EditItemModal.vue";

const config = useRuntimeConfig()
const DIRECTUS_URL = config.public.directusUrl

const props = defineProps<{
  item: Item
  location?: boolean // optional, für einfache Ansicht kann false bleiben
  editable?: boolean // optional, aktiviert + / - Buttons
}>()

const itemStore = useItemStore()

const moveItem = ref<Item | null>(null);
const uploadImageForItem = ref<Item | null>(null);
const editItem = ref<Item | null>(null);
</script>

<template>
  <li class="list-row flex items-center">
    <!-- Menge & Buttons -->
    <EditItemAmount :item="item" v-if="editable" class="not-sm:hidden"/>

    <!-- Bild & Name -->
    <img
        v-if="props.item.item_image"
        :src="`${DIRECTUS_URL}/assets/${props.item.item_image}?height=40`"
        alt="Foto des Gegenstands"
        class="h-10 w-auto object-cover"
    />
    <div class="flex flex-col gap-1 flex-grow">
      <div class="flex flex-row gap-2 items-center">
        <p class="text-base-content text-xl">
          {{ props.item.name }}
        </p>
        <div v-if="props.item?.description"
             class="m-2 p-1 border border-dashed border-info text-info w-fit not-sm:hidden">
          {{ props.item.description }}
        </div>
      </div>
      <ItemLocation :item="item" v-if="props.location"/>
    </div>
    <details class="dropdown dropdown-end">
      <summary class="btn btn-secondary m-1">
        <EllipsisVerticalIcon class="h-6 w-6"/>
      </summary>
      <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm gap-1">
        <li class="sm:hidden">
          <EditItemAmount :item="item"/>
        </li>
        <li>
          <button class="btn btn-secondary" @click="editItem = item">
            <PencilIcon class="h-6 w-6"/>
            Bearbeiten
          </button>
        </li>
        <li>
          <button class="btn" @click="uploadImageForItem = item">
            <CameraIcon class="h-6 w-6"/>
            hochladen
          </button>
        </li>
        <li>
          <button class="btn" @click="moveItem = item">
            <ArrowsRightLeftIcon class="h-6 w-6"/>
            Verschieben
          </button>
        </li>
        <li>
          <button class="btn btn-error" @click="itemStore.deleteItem(item)">
            <TrashIcon class="h-6 w-6"/>
            Löschen
          </button>
        </li>
      </ul>
    </details>
    <MoveItemModal :visible="!!moveItem" :item="moveItem || {} as Item" @closeDialog="moveItem = null"/>
    <ImageUploadModal :visible="!!uploadImageForItem"
                      :oldImageUrl="uploadImageForItem?.item_image ? `${DIRECTUS_URL}/assets/${uploadImageForItem?.item_image}` : ''"
                      @close="uploadImageForItem = null"
                      @upload="file => itemStore.uploadImage(file, uploadImageForItem)"/>
    <EditItemModal :visible="!!editItem" :item="editItem" @close="editItem = null" @save="updated => itemStore.editItem(updated)"/>
  </li>
</template>