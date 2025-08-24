<script setup lang="ts">
import { HomeIcon } from "@heroicons/vue/24/solid";
import { useRoute } from "#imports";

const route = useRoute();

// Mapping für schöne Labels
const labelMap: Record<string, string> = {
  kiosk: "Kiosk",
  settings: "Einstellungen",
  boxes: "Kisten",
  items: "Gegenstände",
  persons: "Personen",
  sell: "Verkaufen",
};

// Alle Segmente außer der Root
const segments = computed(() => {
  const path = route.path.split("/").filter(Boolean);
  return path.map((segment, index) => {
    const to = "/" + path.slice(0, index + 1).join("/");
    return {
      to,
      label: labelMap[segment] || segment,
      isLast: index === path.length - 1,
    };
  });
});
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <!-- Home Link -->
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6" />
        </NuxtLink>
      </li>

      <!-- Dynamische Segmente -->
      <li v-for="s in segments" :key="s.to">
        <span v-if="s.isLast">{{ s.label }}</span>
        <NuxtLink v-else :to="s.to">{{ s.label }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>