<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();
defineEmits(["update:modelValue", "search"]);
</script>

<template>
  <div class="flex flex-row">
    <label class="floating-label m-2 flex flex-row flex-grow">
      <span>Suche</span>
      <input
          type="search"
          placeholder="Search..."
          :value="modelValue"
          class="input input-secondary"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          @keydown.enter="$emit('search')"
      />
    </label>
    <button @click="$emit('search')" class="btn btn-primary m-2">
      Suchen
    </button>
  </div>
</template>