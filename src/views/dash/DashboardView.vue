<script setup lang="ts">
import MainFrame from "@/components/MainFrame.vue";
import CardsView from "../../components/CardsView.vue";

const cards = [
  {
    title: "Robôs",
    text: "Páginas com nossa coletânea de robôs para você usar.",
    img_width: "300",
    img_height: "200",
    router_name: "bots",
  },
  {
    title: "Execuções",
    text: "Listagem de suas execuções realizadas com os robôs.",
    img_width: "300",
    img_height: "200",
  },
  {
    title: "Agendamentos",
    text: "Lista de execuções agendadas para os robôs.",
    img_width: "300",
    img_height: "200",
  },
];
</script>

<template>
  <MainFrame>
    <div class="d-flex gap-4 p-3 flex-wrap justify-content-center mt-5" id="dashContent">
      <CardsView
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :text="card.text"
        :img_width="card.img_width"
        :img_height="card.img_height"
        :router_name="card.router_name"
      />
    </div>
  </MainFrame>
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
