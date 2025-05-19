<script setup lang="ts">
import { BCard, BCardText, BButton } from "bootstrap-vue-next";

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
});
</script>

<template>
  <BCard
    :title="props.title"
    :img-src="props.img_src"
    :img-alt="props.img_alt"
    :tag="props.tag"
    img-top
    style="max-width: 20rem; max-height: 25rem"
  >
    <BCardText>
      {{ props.text }}
    </BCardText>
    <BButton href="#" variant="primary">Go somewhere</BButton>
  </BCard>
</template>
