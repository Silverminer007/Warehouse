<script setup lang="ts">

import {ArrowRightIcon, HomeIcon} from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li><NuxtLink to="/"><HomeIcon class="h-6 w-6" /></NuxtLink></li>
      <li>Kiosk</li>
    </ul>
  </div>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
    Kiosk
  </p>
  <NuxtLink to="/kiosk/settings" class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2">
    <p class="text-2xl text-secondary-content flex-grow">Einstellungen</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink to="/kiosk/sell" class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2">
    <p class="text-2xl text-secondary-content flex-grow">Verkaufen</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
</template>

<style scoped>

</style>