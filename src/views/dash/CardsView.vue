<script setup lang="ts">
const props = defineProps({
  img_src: {
    type: String,
    default: "https://picsum.photos/600/300/?image=25",
  },
  img_alt: {
    type: String,
    default: "Image",
  },
  tag: {
    type: String,
    default: "article",
  },
  text: {
    type: String,
    default:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  title: {
    type: String,
    default: "Card Title",
  },
  router_name: {
    type: String,
    default: "dashboard",
  },
  img_width: {
    type: Number,
    default: 100,
  },
  img_height: {
    type: Number,
    default: 100,
  },
});
</script>

<template>
  <BCard img-top style="max-width: 20rem; max-height: 35rem">
    <template #header>
      <h5 class="text-center">
        <RouterLink :to="{ name: props.router_name }" exact-active-class="active">
          {{ props.title }}
        </RouterLink>
      </h5>
    </template>
    <BCardImg
      :src="props.img_src"
      :alt="props.img_alt"
      :width="props.img_width"
      :heigth="props.img_height"
      class="rounded-4 p-3 bg-dark"
    />
    <BCardText class="text-center mt-3 bg-secondary bg-opacity-25 p-3 rounded-4">
      <span class="fw-semibold">{{ props.text }}</span>
    </BCardText>
    <template #footer>
      <div class="d-grid">
        <BButton href="#" variant="primary">Go somewhere</BButton>
      </div>
    </template>
  </BCard>
</template>
