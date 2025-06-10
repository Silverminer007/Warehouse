<script setup lang="ts">
import type {Person} from "~/src/types";

const {person} = defineProps<{
  person: Person
}>();
</script>

<template>
  <li class="list-row flex">
    <p class="text-base-content text-xl flex-grow">{{ person.firstname }} {{ person.lastname }} ({{ (Math.round(person.balance * 100) / 100).toFixed(2) }} €)</p>
    <slot/>
  </li>
</template>

<style scoped>
</style>