<script setup lang="ts">
import { title } from "process";
import CardsView from "../../components/CardsView.vue";
import { fileURLToPath, URL } from "url";
import botsList from "@/assets/json/bots_list.json";
import { botRecord } from "@/types/botArray";

const cards: botRecord[] = botsList;

console.log(cards);
</script>

<template>
  <div class="vh-50">
    <main
      class="d-flex justify-content-center align-items-center overflow-y-auto overflow-x-hidden"
    >
      <div class="d-flex gap-4 p-3 flex-wrap justify-content-center mt-5" id="dashContent">
        <CardsView
          v-for="(card, index) in cards"
          :key="index"
          :title="card.display_name"
          :text="card.text"
          :img_src="card.img_src"
          :img_width="card.img_width"
          :img_height="card.img_height"
        />
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
