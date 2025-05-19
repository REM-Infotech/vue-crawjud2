<script setup lang="ts">
import { RouterView } from "vue-router";
import ChoseThemeView from "./components/ChoseThemeView.vue";
import NavbarView from "./components/NavbarView.vue";
</script>

<template>
  <NavbarView />
  <RouterView v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </RouterView>
  <ChoseThemeView />
</template>
