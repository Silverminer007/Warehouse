<script setup lang="ts">

import {ArrowRightIcon, HomeIcon} from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6"/>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/kiosk">Kiosk</NuxtLink>
      </li>
      <li>Einstellungen</li>
    </ul>
  </div>
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
    Kiosk - Einstellungen
  </p>
  <NuxtLink to="/kiosk/settings/boxes" class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2">
    <p class="text-2xl text-secondary-content flex-grow">Kisten</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink to="/kiosk/settings/items" class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2">
    <p class="text-2xl text-secondary-content flex-grow">Gegenstände + Preise</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink to="/kiosk/settings/people" class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2">
    <p class="text-2xl text-secondary-content flex-grow">Personen</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <ul>
    <li>Preise pro Gegenstand setzen?</li>
    <li>Inventar sehen?</li>
  </ul>
</template>

<style scoped>

</style>