<script setup lang="ts">
import elawImg from "@/assets/svg/elaw.svg";
import esaj from "@/assets/svg/esaj.svg";
import projudiImg from "@/assets/svg/projudi.svg";
import { botRecord } from "@/types/botArray";
import { useRouter } from "vue-router";

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
    default: "300px",
  },
  img_height: {
    type: String,
    default: "300px",
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

function pushRouter(id: string, system: string, type: string, display_name: string) {
  router.push({ name: "bot_form", params: { id, system, type, display_name } });
}
</script>

<template>
  <div class="card" style="max-width: 20rem; max-height: 65vh">
    <div class="card-header">
      <h5 class="text-center">
        {{ props.title }}
      </h5>
    </div>
    <img
      :src="loadImage(props.img_src)"
      :alt="props.img_alt"
      class="card-img-top rounded-1 p-1 bg-dark"
    />
    <div class="card-body">
      <div class="text-center mt-3 bg-secondary bg-opacity-25 p-3 rounded-4">
        <span class="fw-semibold">{{ props.text }}</span>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-grid">
        <BButton
          @click="
            pushRouter(
              props.other_args.id,
              props.other_args.system,
              props.other_args.type,
              props.other_args.display_name,
            )
          "
          variant="primary"
          class="mb-2"
        >
          <span class="fw-bold">Acessar</span>
        </BButton>
      </div>
    </div>
  </div>
</template>
