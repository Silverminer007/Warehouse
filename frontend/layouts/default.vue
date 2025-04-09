<script setup lang="ts">
</script>

<template>
  <div>
    <div class="flex flex-row items-center gap-2 bg-slate-700 p-4">
      <img src="/logo.png" alt="icon" width="40"/>
      <h1 class="text-white text-bold rounded-b-sm text-4xl">KjG Warehouse</h1>
    </div>
    <slot/>
  </div>
</template>

<style scoped>
@import 'tailwindcss/tailwind.css';
:global(body) {
  background-color: black;
}
</style>