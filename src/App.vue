<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import ChoseThemeView from "./components/ChoseThemeView.vue";
import NavbarView from "./components/NavbarView.vue";
</script>

<template>
  <NavbarView />
  <RouterView />
  <ChoseThemeView />
</template>

