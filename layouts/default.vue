<script setup lang="ts">
import {MagnifyingGlassIcon} from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex flex-row items-center gap-2 bg-slate-800 p-4">
    <a href="/">
      <img src="/logo.png" alt="icon" width="40"/>
    </a>
    <h1 class="text-white text-bold rounded-b-sm text-4xl flex-grow">KjG Warehouse</h1>
    <a href="/search">
      <MagnifyingGlassIcon class="h-6 w-6 text-white"/>
    </a>
  </div>
  <slot/>
</template>

<style scoped>
</style>