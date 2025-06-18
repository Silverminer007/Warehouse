<script setup lang="ts">
import {XMarkIcon, PlusIcon} from "@heroicons/vue/24/solid";
import {getPersons} from "~/src/dataloader";
import type {Person} from "~/src/types";
import AddPersonModal from "~/components/kiosk/AddPersonModal.vue";
import SetBalanceModal from "~/components/kiosk/SetBalanceModal.vue";

const personData = await useAsyncData('persons', () => getPersons());
const persons: Ref<Person[]> = ref(!!personData.error.value ? [] : (personData.data.value || []));

async function removePerson(person: Person) {
  const response = await fetch('https://items.kjg-st-barbara.de/items/person/' + person.id, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    }
  });
  if (response.ok) {
    persons.value.splice(persons.value.indexOf(person), 1);
  }
}

async function update() {
  persons.value = await getPersons();
}
</script>

<template>
  <div
      class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2 flex flex-row items-center justify-center">
    <p class="flex-grow">Personen</p>
    <button class="btn btn-tertiary mx-2" onclick="set_balance_modal.showModal()">
      Kontostand setzen
    </button>
    <div onclick="add_person_modal.showModal()">
      <PlusIcon class="h-8 w-8"/>
    </div>
  </div>
  <dialog id="add_person_modal" class="modal">
    <div class="modal-box">
      <AddPersonModal @update="update"/>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="update">close</button>
    </form>
  </dialog>
  <dialog id="set_balance_modal" class="modal">
    <div class="modal-box">
      <SetBalanceModal @update="update"/>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="update">close</button>
    </form>
  </dialog>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <PersonListEntry v-for="person in persons" :key="person.id" :person="person">
      <button type="button" @click="removePerson(person)">
        <XMarkIcon class="h-6 w-6 text-base-content"/>
      </button>
    </PersonListEntry>
  </ul>
</template>

<style scoped>

</style>