<script setup lang="ts">
import { useRoute } from "vue-router";
import Breadcrumbs from "~/components/kiosk/KioskBreadcrumbs.vue";
import SellSearch from "~/components/kiosk/SellSearch.vue";
import SellItemList from "~/components/kiosk/SellItemList.vue";
import SellCartSummary from "~/components/kiosk/SellCartSummary.vue";
import { useSellCart } from "~/composables/kiosk/useSellCart";

const route = useRoute();
const id = route.params.sellTo as string;

const { person, estimatedBalance, shoppingCart, items, searchText, doSearch, addItemToCart, checkout } = await useSellCart(id);
</script>

<template>
  <Breadcrumbs :paths="['Kiosk', 'Verkaufen', person?.firstname + ' ' + person?.lastname]" />

  <SellCartSummary
      :person="person"
      :estimatedBalance="estimatedBalance"
      :shoppingCart="shoppingCart"
      @checkout="checkout"
  />

  <SellSearch v-model="searchText" @search="doSearch" />

  <SellItemList
      :items="items"
      :shoppingCart="shoppingCart"
      :searchText="searchText"
      @add="addItemToCart"
  />
</template>