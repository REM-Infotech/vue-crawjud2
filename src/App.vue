<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import ChoseThemeView from "./components/ChoseThemeView.vue";
</script>

<template>
  <RouterView />
  <RouterLink :to="{ name: 'dashboard' }">Teste</RouterLink>
  <button>
    <RouterLink :to="{ name: 'login'}"> Teste</RouterLink>
  </button>
</template>
