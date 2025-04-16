<script setup lang="ts">
import type {Box} from "~/src/types";
import BoxListEntry from "~/components/BoxListEntry.vue";

const {boxes} = defineProps<{
  boxes: Box[]
}>();
</script>

<template>
  <ul class="list bg-base-200 rounded-box shadow-md m-2">
    <BoxListEntry v-for="box in boxes" :key="box.id" :box="box"/>
  </ul>
</template>

<style scoped>

</style>