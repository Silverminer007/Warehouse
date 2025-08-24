<!-- pages/index.vue -->
<script lang="ts" setup>
import {ArrowRightIcon, HomeIcon} from '@heroicons/vue/24/solid'
</script>

<template>
  <!-- Breadcrumb -->
  <div class="breadcrumbs text-base-content m-2">
    <ul>
      <li>
        <NuxtLink to="/">
          <HomeIcon class="h-6 w-6"/>
        </NuxtLink>
      </li>
    </ul>
  </div>

  <!-- Features -->
  <p class="bg-primary text-2xl text-primary-content rounded-xl p-2">Features</p>
  <NuxtLink class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2" to="/inventory">
    <p class="text-2xl text-secondary-content flex-grow">Gegenstände verwalten</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2" to="/search">
    <p class="text-2xl text-secondary-content flex-grow">Gegenstände suchen</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <!--
  <NuxtLink class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2" to="/packinglists">
    <p class="text-2xl text-secondary-content flex-grow">Packlisten</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  <NuxtLink class="bg-secondary flex flex-row items-center rounded-xl p-2 m-2" to="/kiosk">
    <p class="text-2xl text-secondary-content flex-grow">Kiosk</p>
    <ArrowRightIcon class="h-6 w-6 text-secondary-content"/>
  </NuxtLink>
  -->
</template>