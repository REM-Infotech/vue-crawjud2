<script setup lang="ts">
import WindowControl from "./window/WindowControl.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <nav class="navbar navbar-expand-lg app-navbar titlebar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>

      <div class="d-flex me-auto not_drag" v-if="route.name !== 'login'">
        <RouterLink class="nav-link m-2" :to="{ name: 'dashboard' }" exact-active-class="active">
          Dashboard
        </RouterLink>
        <RouterLink class="nav-link m-2" :to="{ name: 'dashboard' }" exact-active-class="active">
          Dashboard
        </RouterLink>
        <RouterLink class="nav-link m-2" :to="{ name: 'login' }" exact-active-class="active">
          Logout
        </RouterLink>
      </div>
      <WindowControl />
    </div>
  </nav>
</template>
<style scoped lang="css">
.titlebar {
  app-region: drag;
}
.not_drag {
  app-region: no-drag;
}
</style>
