<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue'

defineProps<{
  visible: boolean
}>()

const firstname = ref<string>("")
const lastname = ref<string>("")
const balance = ref<number>(20)

const errors = ref<{ firstname?: string; lastname?: string; balance?: string }>({})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'add', payload: {
    firstname: string,
    lastname: string,
    balance: number
  }): void
}>()

const closeModal = () => {
  errors.value = {}
  emit('update:visible', false)
}

const validate = () => {
  const newErrors: typeof errors.value = {}

  if (!firstname.value.trim()) {
    newErrors.firstname = "Vorname darf nicht leer sein."
  }
  if (!lastname.value.trim()) {
    newErrors.lastname = "Nachname darf nicht leer sein."
  }
  if (balance.value == null || isNaN(balance.value) || balance.value < 0) {
    newErrors.balance = "Kontostand muss größer oder gleich 0 sein."
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleAdd = async () => {
  if (!validate()) return

  emit('add', {
    firstname: firstname.value,
    lastname: lastname.value,
    balance: balance.value,
  })

  firstname.value = ''
  lastname.value = ''
  balance.value = 20
  closeModal()
}
</script>

<template>
  <dialog v-if="visible" class="modal" open>
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">Neue Person hinzufügen</h3>

      <div class="space-y-4">
        <!-- Vorname -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Vorname</span>
          </label>
          <input v-model="firstname" class="input input-bordered w-full" type="text"/>
          <p v-if="errors.firstname" class="text-error text-sm mt-1">{{ errors.firstname }}</p>
        </div>

        <!-- Nachname -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Nachname</span>
          </label>
          <input v-model="lastname" class="input input-bordered w-full" type="text"/>
          <p v-if="errors.lastname" class="text-error text-sm mt-1">{{ errors.lastname }}</p>
        </div>

        <!-- Kontostand -->
        <div class="form-control">
          <label class="label">
            <span class="label-text">Kontostand</span>
          </label>
          <input v-model.number="balance" class="input input-bordered w-full" type="number"/>
          <p v-if="errors.balance" class="text-error text-sm mt-1">{{ errors.balance }}</p>
        </div>
      </div>

      <div class="modal-action">
        <button class="btn btn-primary" @click="handleAdd">Hinzufügen</button>
        <button class="btn btn-secondary" @click="closeModal">Abbrechen</button>
      </div>
    </div>
  </dialog>
</template>