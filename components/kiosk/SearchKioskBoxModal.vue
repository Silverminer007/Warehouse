<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold">Kiosk Kisten suchen</h2>

    <input
        v-model="searchTerm"
        class="input input-bordered w-full"
        placeholder="Box suchen..."
        type="text"
    />

    <ul class="list bg-base-200 rounded-box p-2">
      <li
          v-for="box in filteredBoxes"
          :key="box.id"
          class="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
          @click="addBoxToKiosk(box)"
      >
        {{ box.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {useKioskBoxes} from '~/composables/kiosk/useKioskBoxes'

const {searchTerm, filteredBoxes, addBoxToKiosk} = await useKioskBoxes()
</script>

<style scoped>
.list li:hover {
  background-color: #f3f4f6;
}
</style>