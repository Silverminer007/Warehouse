<script lang="ts" setup>
import {defineEmits, ref} from 'vue'
import {usePersons} from '~/composables/kiosk/usePersons'

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'update'): void
}>()

const visible = ref(false)
const selectedPersonId = ref<string | null>(null)
const newBalance = ref<number>(0)

const {persons, loadPersons} = usePersons()

const closeModal = () => {
  emit('update:visible', false)
}

const setBalance = async () => {
  if (!selectedPersonId.value) return
  try {
    const config = useRuntimeConfig()
    const DIRECTUS_URL = config.public.directusUrl

    const res = await fetch(`${DIRECTUS_URL}/items/person/${selectedPersonId.value}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({balance: newBalance.value}),
    })
    if (!res.ok) throw new Error('Fehler beim Aktualisieren')

    await loadPersons()
    emit('update')
    closeModal()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Kontostand setzen</h3>
      <div class="form-control">
        <label class="label">Person</label>
        <select v-model="selectedPersonId" class="select select-bordered">
          <option v-for="p in persons" :key="p.id" :value="p.id">
            {{ p.firstname }} {{ p.lastname }}
          </option>
        </select>
      </div>
      <div class="form-control">
        <label class="label">Neuer Kontostand</label>
        <input v-model.number="newBalance" class="input input-bordered" type="number"/>
      </div>
      <div class="modal-action">
        <button class="btn btn-primary" @click="setBalance">Setzen</button>
        <button class="btn btn-secondary" @click="closeModal">Abbrechen</button>
      </div>
    </div>
  </dialog>
</template>