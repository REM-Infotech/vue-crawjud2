<script setup>
import { onMounted, onUnmounted, ref } from "vue";
const emit = defineEmits(["files-dropped"]);

const active = ref(false);
let inActiveTimeout = null;

function setActive() {
  active.value = true;
  clearTimeout(inActiveTimeout);
}

function setInactive() {
  inActiveTimeout = setTimeout(() => {
    active.value = false;
  }, 50);
}

function onDrop(e) {
  setInactive();
  emit("files-dropped", [...e.dataTransfer.files]);
}

function preventDefaults(e) {
  e.preventDefault();
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});

// Evento de clique para carregar arquivos
const fileInput = ref(null);
function openFileDialog() {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  fileInput.value && fileInput.value.click();
}

function onFileChange(event) {
  const files = event.target.files;
  if (files.length) {
    emit("files-dropped", Array.from(files));
  }
  event.target.value = "";
}
</script>
<template>
  <div
    :data-active="active"
    @click="openFileDialog"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
  >
    <slot :dropZoneActive="active" aria-required="true"></slot>
    <!-- Input de arquivo oculto -->
    <input
      ref="fileInput"
      type="file"
      accept=".xlsx, .pdf, .docx, .csv"
      multiple
      style="display: none"
      @change="onFileChange"
      aria-required="true"
    />
  </div>
</template>
