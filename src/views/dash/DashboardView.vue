<script setup lang="ts">
import CardsView from "./CardsView.vue";
</script>

<template>
  <div class="vh-50">
    <main
      class="d-flex justify-content-center align-items-center overflow-y-auto overflow-x-hidden"
    >
      <div class="d-flex gap-4 p-3 flex-wrap justify-content-center mt-5" id="dashContent">
        <CardsView />
        <CardsView />
        <CardsView />
      </div>
    </main>
  </div>
</template>
<style scoped lang="scss">
@import "../../assets/scss/default.scss";

#dashContent {
  height: calc(100vh - 115px);
}

.main_login {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

.btn-purple {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

[data-bs-theme="dark"] {
  .main_login {
    background-color: $amethyst-950;
    color: #fff;
  }
  .main_frame {
    background-color: $amethyst-300;
  }
}
[data-bs-theme="light"] {
  .main_login {
    background-color: $amethyst-300;
  }
}
</style>
