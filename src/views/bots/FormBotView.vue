<script setup lang="ts">
import { botRecord } from "@/types/botArray";
import { onBeforeMount, onMounted } from "vue";
import { useRoute } from "vue-router";
import FormRefs from "./FormRefs";
import DropZone from "./components/FileDropZone.vue";
import FormFileCfg from "./FormFileCfg";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/assets/scss/main.scss";
const { files, FormBot } = FormRefs();
const route = useRoute();
const { addFiles } = FormFileCfg();
let params: botRecord;

onBeforeMount(() => {
  params = route.params as unknown as botRecord;
});

const addfiles_ = (filesAppend: File[]) => {
  const filesPush = addFiles(filesAppend, files);

  FormBot.files.push(...filesPush);
  files.value.push(...filesPush);
};
</script>

<template>
  <MainFrame>
    <BContainer fluid class="mt-4">
      <BCard img-top>
        <template #header>
          <h5 class="text-center">{{ params.display_name }}</h5>
        </template>
        <BRow>
          <BCol md="3" class="d-flex flex-column dropzone_background rounded-2 ms-2">
            <DropZone
              v-model="FormBot.files"
              @files-dropped="addfiles_"
              #default="{ dropZoneActive }"
              class="h-100 rounded-2 dropzone_background flex-grow-1 d-flex flex-column justify-content-center align-items-center"
              style="min-height: 65vh"
            >
              <Transition name="fade" mode="out-in">
                <div
                  v-if="dropZoneActive"
                  class="d-flex flex-column justify-content-center align-items-center"
                >
                  <FontAwesomeIcon :icon="faFileDownload" size="5x" class="mb-3" />
                  <h5 class="text-center">Arraste e solte os arquivos aqui</h5>
                </div>
                <div v-else class="d-flex flex-column justify-content-center align-items-center">
                  <FontAwesomeIcon :icon="faFileDownload" size="5x" class="mb-3" />
                  <h5 class="text-center">Clique ou arraste os arquivos aqui</h5>
                </div>
              </Transition>
            </DropZone>
          </BCol>
        </BRow>
      </BCard>
    </BContainer>
  </MainFrame>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
@import "../../assets/scss/colors.scss";

#CardBody {
  height: calc(85vh - 115px);
  overflow-y: auto;
}

.dropzone_background {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

[data-bs-theme="dark"] {
  .dropzone_background {
    background-color: $amethyst-800;
  }
}
[data-bs-theme="light"] {
  .dropzone_background {
    background-color: $amethyst-400;
  }
}
</style>
