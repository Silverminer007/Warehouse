<script setup lang="ts">
import { ref, watch } from "vue"

const props = defineProps<{
  visible: boolean;
  oldImageUrl?: string;
}>()

const emit = defineEmits<{
  (e: "close"): void
  (e: "upload", file: File): void
}>()

const file = ref<File | null>(null)
const preview = ref<string | null>(props.oldImageUrl || null)

// Sichtbarkeit steuern
const close = () => emit("close")

// Datei auswählen
const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    file.value = input.files[0]
    preview.value = URL.createObjectURL(input.files[0])
  }
}

// Upload
const handleUpload = () => {
  if (file.value) {
    emit("upload", file.value)
    close()
  }
}

// Reset preview, wenn Modal geschlossen wird
watch(
    () => props.visible,
    (newVal) => {
      if (!newVal) {
        file.value = null
        preview.value = null
      }
    }
)
</script>

<template>
  <dialog class="modal" :open="visible">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Bild hochladen</h3>

      <input
          type="file"
          accept="image/*"
          class="file-input file-input-bordered w-full mt-4"
          @change="handleFileChange"
      />

      <div v-if="preview" class="mt-4">
        <p class="text-sm text-gray-500 mb-2">Vorschau:</p>
        <img :src="preview" alt="Preview" class="max-h-60 rounded-lg shadow" />
      </div>

      <div class="modal-action">
        <button class="btn" @click="close">Abbrechen</button>
        <button class="btn btn-primary" :disabled="!file" @click="handleUpload">
          Hochladen
        </button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="close">close</button>
    </form>
  </dialog>
</template>