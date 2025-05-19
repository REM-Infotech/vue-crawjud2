import type { botRecord } from "@/types/botArray";
export default function () {
  const propsSetup = {
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
  };

  return { propsSetup };
}
