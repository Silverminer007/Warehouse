<script setup lang="ts">
import { type Component } from "vue";

type BreadcrumbLink = {
  to?: string;
  label?: string;
  icon?: Component;
};

defineProps<{
  links: BreadcrumbLink[];
}>();
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li v-for="(link, idx) in links" :key="idx">
        <NuxtLink v-if="link.to" :to="link.to" class="flex items-center gap-1">
          <component v-if="link.icon" :is="link.icon" class="h-5 w-5"/>
          <span v-if="link.label">{{ link.label }}</span>
        </NuxtLink>
        <span v-else class="flex items-center gap-1">
          <component v-if="link.icon" :is="link.icon" class="h-5 w-5"/>
          <span v-if="link.label">{{ link.label }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>