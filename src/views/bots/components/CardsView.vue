<script setup lang="ts">
import projudiImg from "@/assets/svg/projudi.svg";
import elawImg from "@/assets/svg/elaw.svg";
import esaj from "@/assets/svg/esaj.svg";
import setup from "../setup";
const images = {
  elaw: elawImg,
  projudi: projudiImg,
  esaj: esaj,
};

const { props } = setup();

function loadImage(img: string): string {
  if (img.includes("https") || img.includes("http")) {
    return img;
  } else {
    return images[img as keyof typeof images];
  }
}
</script>

<template>
  <BCard img-top style="max-width: 20rem; max-height: 35rem">
    <template #header>
      <h5 class="text-center">
        {{ props.title }}
      </h5>
    </template>
    <BCardImg
      :src="loadImage(props.img_src)"
      :alt="props.img_alt"
      :width="props.img_width"
      :heigth="props.img_height"
      class="rounded-1 p-1 bg-dark"
    />
    <BCardText class="text-center mt-3 bg-secondary bg-opacity-25 p-3 rounded-4">
      <span class="fw-semibold">{{ props.text }}</span>
    </BCardText>
    <template #footer>
      <div class="d-grid">
        <RouterLink :to="{ name: props.router_name }" class="btn btn-primary">
          <span class="fw-bold">Acessar</span>
        </RouterLink>
      </div>
    </template>
  </BCard>
</template>
