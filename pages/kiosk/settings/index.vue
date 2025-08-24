<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/solid";
import SettingsCard from "~/components/kiosk/SettingsCard.vue";
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
      <li>Einstellungen</li>
    </ul>
  </div>

  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2">
    Kiosk - Einstellungen
  </p>

  <!-- Karten für die verschiedenen Einstellungsbereiche -->
  <SettingsCard to="/kiosk/settings/boxes" label="Kisten" />
  <SettingsCard to="/kiosk/settings/items" label="Gegenstände + Preise" />
  <SettingsCard to="/kiosk/settings/persons" label="Personen" />
</template>