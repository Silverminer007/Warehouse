<script setup lang="ts">
import type { Item } from "@/types/inventory";

defineProps<{
  item: Item;
}>();
</script>

<template>
  <div class="flex flex-row items-center p-2 border-b border-base-300">
    <!-- Linke Seite: Basisinfos -->
    <div class="flex-grow">
      <p class="text-lg font-semibold">{{ item.name }}</p>
      <p class="text-sm text-base-content/70">
        {{ item?.box?.name || 'Keine Kiste' }}
        <span v-if="item?.box?.shelf"> · {{ item.box.shelf.name }}</span>
        <span v-if="item?.box?.shelf?.room"> · {{ item.box.shelf.room.name }}</span>
      </p>
    </div>

    <!-- Rechte Seite: Slot für Aktionen (z. B. Entfernen-Button) -->
    <div>
      <slot />
    </div>
  </div>
</template>