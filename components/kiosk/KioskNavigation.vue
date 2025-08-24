<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/solid";

const links = [
  { to: "/kiosk/settings", label: "Einstellungen" },
  { to: "/kiosk/sell", label: "Verkaufen" },
];
</script>

<template>
  <nav>
    <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="bg-secondary flex flex-row items-center rounded-xl p-2 my-2"
    >
      <p class="text-2xl text-secondary-content flex-grow">{{ link.label }}</p>
      <ArrowRightIcon class="h-6 w-6 text-secondary-content" />
    </NuxtLink>
  </nav>
</template>