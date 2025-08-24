<script lang="ts" setup>
import type {Item} from '~/src/types'
import {defineEmits, defineProps} from 'vue'

const props = defineProps<{
  item: Item | null
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'upload', file: File): void
}>()

function closeModal() {
  emit('update:modelValue', false)
}

function handleFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) emit('upload', file)
}
</script>

<template>
  <div v-if="modelValue" class="modal modal-open">
    <div class="modal-box">
      <p class="text-xl font-bold">{{ item?.name }}</p>

      <img
          v-if="item?.item_image"
          :src="`https://items.kjg-st-barbara.de/assets/${item.item_image}?height=100`"
          alt="Item image"
          class="my-2"
      />

      <div v-else class="alert alert-warning">Kein Bild vorhanden</div>

      <input
          accept="image/*"
          capture="environment"
          class="file-input w-full mt-4"
          type="file"
          @change="handleFileChange"
      />

      <div class="modal-action">
        <button class="btn" @click="closeModal">Schließen</button>
      </div>
    </div>
    <div class="modal-backdrop" @click="closeModal"></div>
  </div>
</template>