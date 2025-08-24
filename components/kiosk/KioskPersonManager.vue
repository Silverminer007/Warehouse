<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {PlusIcon, XMarkIcon} from '@heroicons/vue/24/solid'
import {usePersons} from '~/composables/kiosk/usePersons'
import AddPersonModal from './AddPersonModal.vue'
import SetBalanceModal from './SetBalanceModal.vue'
import PersonListEntry from './PersonListEntry.vue'

const {
  persons,
  loadPersons,
  addPerson,
  removePerson,
} = usePersons()

onMounted(() => {
  loadPersons()
})

const showAddModal = ref(false)
const showBalanceModal = ref(false)

const handleRemove = async (personId: number) => {
  await removePerson(personId)
}

const handleAddPerson = async (payload: { firstname: string, lastname: string, balance: number }) => {
  await addPerson(payload.firstname, payload.lastname, payload.balance);
}
</script>

<template>
  <div class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2 flex flex-row items-center justify-center">
    <p class="flex-grow">Personen</p>
    <button class="btn btn-tertiary mx-2" @click="showBalanceModal = true">Kontostand setzen</button>
    <div @click="showAddModal = true">
      <PlusIcon class="h-8 w-8"/>
    </div>
  </div>

  <!-- Add Person Modal -->
  <AddPersonModal v-if="showAddModal"
                  v-model:visible="showAddModal"
                  @add="handleAddPerson"/>

  <!-- Set Balance Modal -->
  <SetBalanceModal v-if="showBalanceModal"
                   v-model:visible="showBalanceModal"
                   @update="loadPersons"/>

  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <PersonListEntry v-for="person in persons" :key="person.id" :person="person">
      <button type="button" @click="handleRemove(person.id)">
        <XMarkIcon class="h-6 w-6 text-base-content"/>
      </button>
    </PersonListEntry>
  </ul>
</template>