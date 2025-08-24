<script lang="ts" setup>
import type {Box} from '@/types/inventory'

const props = defineProps<{ box: Box }>()
</script>

<template>
  <li class="list-row flex items-center">
    <slot name="left"/>
    <NuxtLink :to="`/inventory/boxes/${box.id}`" class="flex-grow">
      <p class="text-base-content text-xl cursor-pointer">{{ props.box.name }}</p>
    </NuxtLink>
    <slot/>
  </li>
</template>