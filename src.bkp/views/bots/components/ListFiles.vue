<script setup lang="ts">
import { TUploadableFile } from "@/types/FormBot";
import { computed } from "vue";

const props = defineProps<{
  files: TUploadableFile;
  selected?: boolean;
}>();

const emit = defineEmits(["update:selected"]);

const isSelected = computed({
  get: () => props.selected,
  set: (val: boolean) => emit("update:selected", val),
});
</script>

<template>
  <li
    @click="isSelected = !isSelected"
    :class="{
      'bg-body-tertiary rounded-2 p-2 mb-2 list-group-item d-flex justify-content-between align-items-center':
        !isSelected,
      'background_selected rounded-2 p-2 mb-2 list-group-item d-flex justify-content-between align-items-center':
        isSelected,
    }"
  >
    {{ props.files.name }}
  </li>
</template>

<style lang="scss">
@import "../../../assets/scss/main.scss";
.background_selected {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

[data-bs-theme="dark"] {
  .background_selected {
    background-color: $amethyst-800 !important;
  }

  .background_selected:focus-within,
  .background_selected:focus-visible,
  .background_selected:focus,
  .background_selected:active,
  .background_selected:hover {
    background-color: $amethyst-800 !important;
  }
}

[data-bs-theme="light"] {
  .background_selected {
    background-color: $amethyst-400 !important;
  }

  .background_selected:hover,
  .background_selected:active,
  .background_selected:focus,
  .background_selected:focus-visible,
  .background_selected:focus-within {
    background-color: $amethyst-500 !important;
  }
}
</style>
