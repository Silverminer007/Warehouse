<script lang="ts" setup>
import {ref} from 'vue'
import {useBoxStore} from "~/stores/inventory/useBoxStore";
import {useShelfStore} from "~/stores/inventory/useShelfStore";

defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeDialog'): void,
}>()
const newBoxName = ref('')

function addBox() {
  if(shelfStore.currentShelf && newBoxName.value) {
    boxStore.addBox(newBoxName.value, shelfStore.currentShelf)
    newBoxName.value = ''
    emit('closeDialog')
  }
}

const boxStore = useBoxStore()
const shelfStore = useShelfStore()
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">Kiste zum Regal "{{ shelfStore.currentShelf.name }}" hinzufügen</p>
      <div class="flex gap-2 justify-center p-2">
        <input v-model="newBoxName" class="input input-primary" minlength="1" placeholder="Name" required
               type="text"/>
        <button class="btn btn-primary" @click="addBox">+ Add</button>
      </div>
    </div>
    <form class="modal-backdrop">
      <button @click="emit('closeDialog')"/>
    </form>
  </dialog>
</template>