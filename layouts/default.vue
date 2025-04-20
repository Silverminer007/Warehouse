<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";

function navigateToSearch() {
  window.location.href = "/search";
}
</script>

<template>
  <div class="flex flex-row items-center gap-2 bg-base-300 p-4">
    <a href="/" class="flex-grow flex flex-row gap-2">
      <img src="/logo.png" alt="icon" width="40"/>
      <h1 class="text-base-content text-bold rounded-b-sm text-4xl">KjG Warehouse</h1>
    </a>
    <button @click="navigateToSearch()" type="button" class="btn btn-primary">
      <MagnifyingGlassIcon class="h-6 w-6 text-primary-content"/>
    </button>
  </div>
  <slot/>
</template>

<style scoped>
</style>