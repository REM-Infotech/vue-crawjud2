<script setup lang="ts">
import projudiImg from "@/assets/svg/projudi.svg";
import elawImg from "@/assets/svg/elaw.svg";
import esaj from "@/assets/svg/esaj.svg";
// eslint-disable-next-line import/no-unresolved
import { botRecord } from "@/types/botArray";
import { useRouter } from "vue-router";
import { BButton } from "bootstrap-vue-next";
const images = {
  elaw: elawImg,
  projudi: projudiImg,
  esaj: esaj,
};

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
    type: String,
    default: "100",
  },
  img_height: {
    type: String,
    default: "100",
  },
  other_args: {
    type: Object as () => botRecord,
    default: {},
  },
});

const router = useRouter();
function loadImage(img: string): string {
  if (img.includes("https") || img.includes("http")) {
    return img;
  } else {
    return images[img as keyof typeof images];
  }
}

function pushRouter(id: string, system: string, type: string) {
  router.push({ name: "bot_form", params: { id, system, type } });
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
        <BButton
          @click="pushRouter(props.other_args.id, props.other_args.system, props.other_args.type)"
          variant="primary"
          class="mb-2"
        >
          <span class="fw-bold">Acessar</span>
        </BButton>
      </div>
    </template>
  </BCard>
</template>
