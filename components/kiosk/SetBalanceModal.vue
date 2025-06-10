<script setup lang="ts">
const newBalance = ref(20.0);

const emit = defineEmits('update');

async function setBalance() {
  await fetch('https://items.kjg-st-barbara.de/items/person', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: {},
      data: {
        balance: newBalance.value
      }
    })
  });
  set_balance_modal.close();
  emit('update');
}
</script>

<template>
  <div class="flex flex-col">
    <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
      Kontostände zurücksetzen
    </p>
    <div class="flex flex-row">
      <label class="floating-label m-2 flex flex-row flex-grow">
        <span>Kontostände setzen auf</span>
        <input type="text" placeholder="Kontostände setzen auf" v-model="newBalance"
               class="input input-secondary"/>
      </label>
      <button @click="setBalance" class="btn btn-primary m-2">
        Setzen
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>