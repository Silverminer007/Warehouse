<script setup lang="ts">
import type { Person } from "@/types/kiosk";
import { computed } from "vue";

defineProps<{
  person?: Person;
  estimatedBalance: number;
  shoppingCart: Map<any, number>;
}>();
defineEmits(["checkout"]);

const isBalanceLow = computed(() => estimatedBalance < 1);
</script>

<template>
  <div class="bg-primary text-2xl text-primary-content rounded-xl p-2 my-2 flex flex-row items-center justify-center">
    <p class="mr-2">
      {{ person?.firstname }} {{ person?.lastname }} ({{ person?.balance.toFixed(2) }} €)
    </p>
    <p :class="isBalanceLow ? 'bg-error text-error-content rounded-xl p-1' : ''">
      Nachher: {{ estimatedBalance.toFixed(2) }} €
    </p>
    <p class="flex-grow"></p>
    <button
        v-if="shoppingCart.size !== 0"
        type="button"
        class="btn btn-secondary"
        @click="$emit('checkout')"
    >
      Kaufen
    </button>
  </div>
</template>