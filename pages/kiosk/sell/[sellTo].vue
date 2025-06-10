<script setup lang="ts">
import {HomeIcon} from "@heroicons/vue/24/solid";
import {getKioskItems, getPerson} from "~/src/dataloader";
import type {Item, Person} from "~/src/types";

const id = useRoute().params.sellTo;

const personData = await useAsyncData('person' + id, () => {
  return getPerson(id);
});
const person: Person | undefined = !!personData.error.value ? undefined : personData.data.value || undefined;
const estimatedBalance = ref(person?.balance);

const itemData = await useAsyncData('kiosk-items', () => getKioskItems());
const error = !!itemData.error.value;
const items: Item[] = error ? [] : (itemData.data.value || []);

const shoppingCart = ref(new Map());

function addItemToCart(item: Item) {
  if ((!shoppingCart.value.has(item) || item.amount > shoppingCart.value.get(item))
      && estimatedBalance.value - item.price >= 0) {
    shoppingCart.value.set(item, (shoppingCart.value.get(item) || 0) + 1);
    estimatedBalance.value = estimatedBalance.value - item.price;
  }
}

async function checkout() {
  const response1 = await fetch('https://items.kjg-st-barbara.de/items/person/' + id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      balance: estimatedBalance.value
    })
  })
  if (!response1.ok) {
    window.alert("Der Kauf ist Fehlgeschlagen, bitte versuche es später erneut");
    return;
  }
  for (const item of shoppingCart.value.keys()) {
    const newAmount = item.amount - shoppingCart.value.get(item);
    if(newAmount == 0) {
      const response2 = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response2.ok) {
        console.log("Failed to delete item " + item);
        continue;
      }
    } else {
      const response2 = await fetch('https://items.kjg-st-barbara.de/items/item/' + item.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: newAmount
        })
      });
      if (!response2.ok) {
        console.log("Failed to update amount of item " + item);
        continue;
      }
    }
    item.amount = newAmount;
  }
  shoppingCart.value.clear();
}
</script>

<template>
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6"/>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/kiosk">Kiosk</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/kiosk/sell">Verkaufen</NuxtLink>
      </li>
      <li>{{ person?.firstname }} {{ person?.lastname }}</li>
    </ul>
  </div>
  <div class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2 flex flex-row items-center justify-center">
    <p class="mr-2">
      {{ person?.firstname }} {{ person?.lastname }} ({{ (Math.round(person?.balance * 100) / 100).toFixed(2) }} €)
    </p>
    <p :class="(estimatedBalance < 1 ? 'bg-error text-error-content rounded-xl p-1' : '')">Nachher:
      {{ (Math.round(estimatedBalance * 100) / 100).toFixed(2) }} €</p>
    <p class="flex-grow"></p>
    <button v-if="shoppingCart.size !== 0" type="button" @click="checkout" class="btn btn-secondary">
      Kaufen
    </button>
  </div>
  <div v-for="item in items.filter(i => i)" :key="item.id" class="flex flex-row flex-wrap">
    <div class="indicator m-4" @click="addItemToCart(item)">
      <span v-if="shoppingCart.has(item)"
            class="indicator-item badge badge-secondary">{{ shoppingCart.get(item) || "" }}</span>
      <div class="card card-border bg-base-100 w-56 shadow-sm">
        <figure class="px-10 pt-10">
          <img
              :src="'https://items.kjg-st-barbara.de/assets/' + item.item_image + '?height=400'"
              :alt="item.name"
              class="rounded-xl"/>
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">{{ item.name }}</h2>
          <p>{{ (Math.round(item.price * 100) / 100).toFixed(2) }} €</p>
          <p>{{item.amount}} Stück verfügbar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>