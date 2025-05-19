<script setup lang="ts">
import "@/assets/scss/main.scss";
import { botRecord } from "@/types/botArray";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BCardBody } from "bootstrap-vue-next";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import DropZone from "./components/FileDropZone.vue";
import ListFiles from "./components/ListFiles.vue";
import FormFileCfg from "./FormFileCfg";
import FormRefs from "./FormRefs";
const { files, FormBot } = FormRefs();
const route = useRoute();
const { addFiles } = FormFileCfg();
let params: botRecord;

const selectedFiles = ref<string[]>([]);

const allSelected = computed(
  () => files.value.length > 0 && selectedFiles.value.length === files.value.length,
);

function toggleSelectAll() {
  if (allSelected.value) {
    selectedFiles.value = [];
  } else {
    selectedFiles.value = files.value.map((f) => f.name);
  }
}

function updateSelection(fileName: string, selected: boolean) {
  if (selected) {
    if (!selectedFiles.value.includes(fileName)) selectedFiles.value.push(fileName);
  } else {
    selectedFiles.value = selectedFiles.value.filter((name) => name !== fileName);
  }
}
const addfiles_ = (filesAppend: File[]) => {
  const filesPush = addFiles(filesAppend, files);

  FormBot.files.push(...filesPush);
  files.value.push(...filesPush);
};

function removeSelectedFiles() {
  selectedFiles.value.forEach((fileName) => {
    const index = files.value.findIndex((file) => file.name === fileName);
    if (index !== -1) {
      files.value.splice(index, 1);
    }
  });
  selectedFiles.value = [];
}

onBeforeMount(() => {
  params = route.params as unknown as botRecord;
});
</script>

<template>
  <MainFrame>
    <BContainer fluid class="mt-4">
      <BCard img-top>
        <template #header>
          <h5 class="text-center">{{ params.display_name }}</h5>
        </template>
        <BForm>
          <BCardBody>
            <BRow class="justify-content-center">
              <BCol
                md="3"
                class="d-flex flex-column dropzone_background responsive_dropzone rounded-2 m-3 p-2"
              >
                <DropZone
                  v-model="FormBot.files"
                  @files-dropped="addfiles_"
                  #default="{ dropZoneActive }"
                  class="rounded-2 flex-grow-1 d-flex flex-column justify-content-center align-items-center"
                >
                  <Transition name="fade" mode="out-in">
                    <div
                      v-if="dropZoneActive"
                      class="d-flex flex-column justify-content-center align-items-center"
                    >
                      <FontAwesomeIcon :icon="faFileDownload" size="5x" class="mb-3" />
                      <h5 class="text-center">Arraste e solte os arquivos aqui</h5>
                    </div>
                    <div
                      v-else
                      class="d-flex flex-column justify-content-center align-items-center"
                    >
                      <FontAwesomeIcon :icon="faFileDownload" size="5x" class="mb-3" />
                      <h5 class="text-center">Clique ou arraste os arquivos aqui</h5>
                    </div>
                  </Transition>
                </DropZone>
              </BCol>
              <BCol md="8" class="d-flex flex-column table_background rounded-2 m-3 p-2">
                <BCard>
                  <template #header>
                    <span class="fw-bold">Arquivos</span>
                  </template>
                  <BCardBody class="overflow-auto responsive_row">
                    <TransitionGroup name="list" tag="ul">
                      <ListFiles
                        v-for="item in files"
                        :files="item"
                        :key="item.name"
                        :selected="selectedFiles.includes(item.name)"
                        @update:selected="(selected) => updateSelection(item.name, selected)"
                      />
                    </TransitionGroup>
                  </BCardBody>

                  <template #footer>
                    <div class="d-flex gap-2">
                      <BButton variant="outline-primary" class="rounded-2" @click="toggleSelectAll">
                        <span class="fw-semibold">
                          {{ allSelected ? "Desmarcar todos" : "Selecionar todos" }}
                        </span>
                      </BButton>
                      <BButton
                        variant="outline-danger"
                        class="rounded-2"
                        @click="removeSelectedFiles"
                      >
                        <span class="fw-semibold"> Remover Selecionados </span>
                      </BButton>
                    </div>
                  </template>
                </BCard>
              </BCol>
            </BRow>
          </BCardBody>
        </BForm>
        <template #footer>
          <div class="d-flex gap-2 justify-content-end">
            <BButton class="rounded-2" variant="outline-success" size="lg">Próxima Página</BButton>
          </div>
        </template>
      </BCard>
    </BContainer>
  </MainFrame>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
@import "../../assets/scss/colors.scss";

.responsive_dropzone {
  height: 40rem;

  @media (max-height: 768px) {
    max-height: 22rem;
  }
  @media (max-height: 576px) {
    max-height: 22rem;
  }
}

.responsive_row {
  height: 30rem;

  @media (max-height: 768px) {
    max-height: 12rem;
  }
  @media (max-height: 576px) {
    max-height: 12rem;
  }
}

.dropzone_background {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

.table_background {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

[data-bs-theme="dark"] {
  .dropzone_background {
    border-style: solid;
    background-color: $amethyst-800;
    border-color: $scarlet-gum-500;
    border-radius: 5px;
  }

  .table_background {
    background-color: $amethyst-800;
  }

  .dropzone_background:hover {
    background-color: $amethyst-700;
    border-color: $scarlet-gum-800;
  }
  .dropzone_background:active {
    background-color: $amethyst-900;
  }
}

[data-bs-theme="light"] {
  .dropzone_background {
    border-style: solid;
    background-color: $amethyst-400;
    border-color: $scarlet-gum-500;
    border-radius: 5px;
  }

  .table_background {
    background-color: $amethyst-400;
  }

  .dropzone_background:hover {
    background-color: $amethyst-300;
    border-color: $scarlet-gum-400;
  }
  .dropzone_background:active {
    background-color: $amethyst-500;
  }
}
</style>
