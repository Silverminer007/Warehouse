<script setup lang="ts">
import {fetchItemsByBox} from "~/src/dataloader";
import ItemList from "~/components/ItemList.vue";
import type {Item} from "~/src/types";

const id = useRoute().params.id;
const itemData = await useAsyncData('boxes:' + id, () => fetchItemsByBox(id));
const error = !!itemData.error.value;
const items : Item[] = error ? [] : (itemData.data.value || []);
</script>

<template>
  <ItemList :items="items"/>
</template>

<style scoped>

</style>