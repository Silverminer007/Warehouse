<script setup lang="ts">
const firstname = ref("");
const lastname = ref("");
const balance = ref(20.0);

const emit = defineEmits(['update']);

async function addPerson() {
  const response = await fetch('https://items.kjg-st-barbara.de/items/person', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstname: firstname.value,
      lastname: lastname.value,
      balance: balance.value
    })
  });
  if (response.ok) {
    firstname.value = "";
    lastname.value = "";
    add_person_modal.close();
    emit('update');
  }
}
</script>

<template>
  <div class="flex flex-col">
    <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
      Person(en) hinzufügen
    </p>
    <div class="flex flex-row">
      <label class="floating-label m-2 flex flex-row">
        <span>Vorname</span>
        <input type="text" placeholder="Vorname" v-model="firstname"
               class="input input-secondary"/>
      </label>
      <label class="floating-label m-2 flex flex-row">
        <span>Nachname</span>
        <input type="text" placeholder="Nachname" v-model="lastname"
               class="input input-secondary"/>
      </label>
      <label class="floating-label m-2 flex flex-row">
        <span>Kontostand</span>
        <input type="text" placeholder="Kontostand" v-model="balance"
               class="input input-secondary"/>
      </label>
      <button @click="addPerson" class="btn btn-primary m-2">
        Add
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>