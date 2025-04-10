<script setup lang="ts">
import type {Box} from "~/src/types";
import BoxListEntry from "~/components/BoxListEntry.vue";

const {boxes} = defineProps<{
  boxes: Box[]
}>();
</script>

<template>
  <BoxListEntry v-for="box in boxes" :key="box.id" :box="box"/>
</template>

<style scoped>

</style>