<script setup lang="ts">
import { useRoomStore} from '~/stores/inventory/useRoomStore'
defineProps<{
  visible: boolean;
}>()
const emit = defineEmits<{
  (e: 'closeDialog'): void
}>()

const roomStore = useRoomStore();

const newRoomName = ref<string>("");
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">Raum hinzufügen</p>
      <div class="flex flex-row items-center justify-center p-2 gap-2">
        <input
            v-model="newRoomName"
            class="input input-primary validator"
            minlength="1"
            placeholder="Name"
            required
            type="text"
        >
        <button class="btn btn-primary" type="button" @click="roomStore.addRoom(newRoomName)">
          + Add
        </button>
      </div>
    </div>
    <form class="modal-backdrop">
      <button @click="emit('closeDialog')">close</button>
    </form>
  </dialog>
</template>

<style scoped>

</style>