<script setup lang="ts">
const searchText = defineModel<string>();
const emit = defineEmits<{ (e: "search"): void }>();
</script>

<template>
  <label class="floating-label m-2 flex flex-row">
    <span>Suche</span>
    <input
        type="search"
        placeholder="Search..."
        v-model="searchText"
        class="input input-secondary"
        @keydown.enter="emit('search')"
        @input="emit('search')"
    />
  </label>
  <button @click="emit('search')" class="btn btn-primary m-2">
    Suchen
  </button>
</template>