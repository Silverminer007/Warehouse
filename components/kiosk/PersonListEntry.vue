<!-- components/kiosk/PersonListEntry.vue -->
<script lang="ts" setup>
import type {Person} from '@/types/kiosk'

const props = defineProps<{
  person: Person
}>()

// Rundet und formatiert den Kontostand
const formattedBalance = computed(() =>
    (Math.round(props.person.balance * 100) / 100).toFixed(2)
)
</script>

<template>
  <li class="list-row flex">
    <p class="text-base-content text-xl flex-grow">
      {{ person.firstname }} {{ person.lastname }} ({{ formattedBalance }} €)
    </p>
    <slot/>
  </li>
</template>

<style scoped>
</style>