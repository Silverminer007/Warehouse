<script setup lang="ts">
import type { Person } from "@/types/kiosk";

defineProps<{
  persons: Person[];
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <li
        v-for="person in persons"
        :key="person.id"
        class="list-row flex"
    >
      <NuxtLink :to="`/kiosk/sell/${person.id}`">
        <p class="text-base-content text-xl flex-grow">
          {{ person.firstname }} {{ person.lastname }}
          ({{ (Math.round(person.balance * 100) / 100).toFixed(2) }} €)
        </p>
      </NuxtLink>
    </li>
  </ul>
</template>