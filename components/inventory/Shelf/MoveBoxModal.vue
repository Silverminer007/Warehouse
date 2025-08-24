<script lang="ts" setup>
import { ref, watch} from 'vue'
import type {Box} from '@/types/inventory'
import {CheckCircleIcon} from '@heroicons/vue/24/solid'
import {useBoxStore} from "~/stores/inventory/useBoxStore";
import {useShelfStore} from "~/stores/inventory/useShelfStore";

const props = defineProps<{
  box: Box | null;
  visible: boolean;
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const boxStore = useBoxStore();
const shelfStore = useShelfStore();

const searchText = ref('')

watch(() => props.box, () => {
  searchText.value = ''
})
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">{{ box?.name }} verschieben</p>

      <label class="floating-label m-2 flex flex-row">
        <span>Suche</span>
        <input v-model="searchText" autofocus class="input input-secondary"
               placeholder="Search..." type="search"/>
      </label>

      <ul class="list">
        <li v-for="moveToShelf in shelfStore.getBySearch(searchText)?.filter(s => s.id !== shelfStore.currentShelf?.id) || []" :key="moveToShelf.id" class="list-row flex items-center gap-2">
          <span class="flex-grow text-base-content text-xl">
            {{ moveToShelf.room?.name }} > {{ moveToShelf.name }}
          </span>
          <button v-if="box" class="btn" @click="boxStore.moveBoxToShelf(box, moveToShelf); emit('close')">
            <CheckCircleIcon class="h-6 w-6 text-primary"/>
          </button>
        </li>
      </ul>
    </div>
    <form class="modal-backdrop">
      <button @click="emit('close')"></button>
    </form>
  </dialog>
</template>