<script lang="ts" setup>
import {ref} from 'vue'
import {useRoomStore} from "~/stores/inventory/useRoomStore";
import {useShelfStore} from "~/stores/inventory/useShelfStore";

defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeDialog'): void
}>()

const shelfStore = useShelfStore();
const roomStore = useRoomStore();

const newShelfName = ref('')

function addShelf() {
  if(roomStore.currentRoom) {
    shelfStore.addShelfToRoom(newShelfName.value, roomStore.currentRoom);
    newShelfName.value = ''
    emit('closeDialog')
  }
}
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">Regal zum Raum "{{ roomStore.currentRoom?.name }}" hinzufügen</p>
      <div class="flex gap-2 justify-center p-2">
        <input v-model="newShelfName" class="input input-primary" minlength="1" placeholder="Name" required
               type="text"/>
        <button class="btn btn-primary" @click="addShelf">+ Add</button>
      </div>
    </div>
    <form class="modal-backdrop">
      <button @click="emit('closeDialog')"/>
    </form>
  </dialog>
</template>