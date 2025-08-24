<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/solid";
import KioskBoxList from "~/components/kiosk/KioskBoxList.vue";
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/kiosk">Kiosk</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/kiosk/settings">Einstellungen</NuxtLink>
      </li>
      <li>Kisten</li>
    </ul>
  </div>

  <!-- Inhalt ausgelagert in eigene Section -->
  <KioskBoxList />
</template>