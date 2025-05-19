import type { TFormBot, TUploadableFile } from "@/types/FormBot";
import { computed, reactive, ref } from "vue";

export default function () {
  const selectedFiles = ref<string[]>([]);
  const allSelected = computed(
    () => files.value.length > 0 && selectedFiles.value.length === files.value.length,
  );
  const FormBot = reactive<TFormBot>({
    system: "",
    state_client: {
      selected: null,
      items: [{ value: null, text: "Carregando" }],
    },
    credentials: {
      selected: null,
      items: [{ value: null, text: "Carregando" }],
    },
    type: "",
    files: [],
    need_files: true,
    need_options: true,
    bot_protocolo: false,
    state_client_type: "",
  });
  const files = ref<TUploadableFile[]>([]);
  return {
    selectedFiles,
    allSelected,
    FormBot,
    files,
  };
}
