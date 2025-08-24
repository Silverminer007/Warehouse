<script lang="ts" setup>
import {ref} from 'vue'
import {useBoxStore} from "~/stores/inventory/useBoxStore";
import {useItemStore} from "~/stores/inventory/useItemStore";

const props = defineProps<{
  visible?: boolean
}>()

const emit = defineEmits<{
  (e: 'closeDialog'): void
}>()

const boxStore = useBoxStore()
const itemStore = useItemStore()

const newItemName = ref('')
const newItemAmount = ref(1)

function addItem() {
  if (!newItemName.value || newItemAmount.value < 1) return
  itemStore.addItem(newItemName.value, newItemAmount.value, boxStore.currentBox)
  newItemName.value = ''
  newItemAmount.value = 1
  closeDialog()
}

function closeDialog() {
  emit('closeDialog')
}
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <p class="text-xl">Items zu "{{ boxStore.currentBox?.name }}" hinzufügen</p>
      <div class="flex flex-row items-center justify-center p-2 gap-2">
        <input v-model="newItemAmount" class="input input-primary w-16" min="1" placeholder="Anzahl" required
               type="number">
        <input v-model="newItemName" class="input input-primary" minlength="1" placeholder="Name" required type="text">
        <button class="btn btn-primary" type="button" @click="addItem">+ Add</button>
      </div>
    </div>
    <form class="modal-backdrop">
      <button @click="closeDialog"/>
    </form>
  </dialog>
</template>