<script setup lang="ts">
import styled from "@vue-styled-components/core";
import { ref } from "vue";
import { RouterView } from "vue-router";
import ChoseThemeView from "./components/ChoseThemeView.vue";
import NavbarView from "./components/NavbarView.vue";
const maxSize = ref(window.innerHeight - 500);
const minSize = ref(window.innerHeight - 500);

const handleResize = () => {
  maxSize.value = window.innerHeight - 500;
  minSize.value = window.innerHeight - 500;
};

const MainFrameProps = { minSize: Number, maxSize: Number };
const MainFrame = styled("div", MainFrameProps)`
  max-height: ${(props) => props.maxSize}px;
  min-height: ${(props) => props.minSize}px;
`;

window.addEventListener("resize", handleResize);
</script>

<template>
  <NavbarView />
  <MainFrame :maxSize="maxSize" :minSize="minSize">
    <RouterView v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </RouterView>
  </MainFrame>
  <ChoseThemeView />
</template>
