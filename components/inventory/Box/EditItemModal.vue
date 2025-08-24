<script setup lang="ts">
import { ref, watch } from "vue"
import type {Item} from "~/types/inventory";

const props = defineProps<{
  visible: boolean
  item: Item | null
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "save", updated: Item): void
}>()

const name = ref("")
const description = ref("")
const amount = ref(1)

watch(
    () => props.item,
    (val) => {
      if (val) {
        name.value = val.name
        description.value = val.description || ""
        amount.value = val.amount
      }
    },
    { immediate: true }
)

const close = () => {
  emit("close")
}

const save = () => {
  if (!props.item) return
  emit("save", {
    ...props.item,
    name: name.value,
    description: description.value,
    amount: amount.value,
  })
  emit("close")
}
</script>

<template>
  <dialog class="modal" :open="visible">
    <div class="modal-box w-96">
      <h3 class="font-bold text-lg mb-4">Item bearbeiten</h3>

      <div class="form-control mb-3">
        <label class="label"><span class="label-text">Name</span></label>
        <input
            type="text"
            v-model="name"
            class="input input-bordered w-full"
            placeholder="Name eingeben"
        />
      </div>

      <div class="form-control mb-3">
        <label class="label"><span class="label-text">Anzahl</span></label>
        <input
            type="number"
            v-model.number="amount"
            min="1"
            class="input input-bordered w-full"
        />
      </div>

      <div class="form-control mb-3">
        <label class="label"><span class="label-text">Beschreibung</span></label>
        <textarea
            v-model="description"
            class="textarea textarea-bordered w-full"
            placeholder="Beschreibung eingeben"
        ></textarea>
      </div>

      <div class="modal-action">
        <button class="btn" @click="close">Abbrechen</button>
        <button class="btn btn-primary" @click="save">Speichern</button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>