<script setup lang="ts">
import "@/assets/scss/main.scss";
import { botRecord } from "@/types/botArray";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { BContainer } from "bootstrap-vue-next";
import { onBeforeMount, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import DropZone from "./components/FileDropZone.vue";
import ListFiles from "./components/ListFiles.vue";
import FormSetup from "./resources/FormConfig";
const route = useRoute();
const {
  FormBot,
  selectedFiles,
  files,
  allSelected,
  removeSelectedFiles,
  updateSelection,
  toggleSelectAll,
  nextPage,
  selected,
  selected2,
  variant,
  variantComputed,
  status,
  disabledStatus,
  addfiles_,
} = FormSetup();
let params: botRecord;

const router = useRouter();
onBeforeMount(() => {
  params = route.params as unknown as botRecord;
});

type OptionType = { value: string | null; text: string; disabled?: boolean };

const ex1Options: OptionType[] = [
  { value: null, text: "Selecione uma Credencial", disabled: true },
];

const ex2Options: OptionType[] = [{ value: null, text: "Selecione o Estado", disabled: true }];

onUnmounted(() => {
  nextPage.value = false;
});

async function handleSubmit(event: Event) {
  event.preventDefault();
  router.push({ name: "logs_execution", params: { pid: "Q9M1E6" } });
  window.electronAPI.add_execution("Q9M1E6");
}
</script>

<template>
  <MainFrame>
    <BContainer :fluid="!nextPage" class="mt-4">
      <BForm @submit="handleSubmit">
        <BCard img-top>
          <template #header>
            <h5 class="text-center">{{ params.display_name }}</h5>
          </template>
          <BCardBody>
            <Transition name="fade" mode="out-in">
              <BRow v-if="!nextPage" class="justify-content-center">
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
                      <div class="d-flex">
                        <h3 class="fw-bold me-auto">Arquivos</h3>
                        <BButton
                          variant="outline-primary"
                          class="rounded-2 ms-auto"
                          @click="removeSelectedFiles"
                        >
                          <span class="fw-semibold"> Planilha modelo </span>
                        </BButton>
                      </div>
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
                      <div class="d-flex gap-2 p-2">
                        <BButton
                          v-model:variant="variant"
                          class="rounded-2"
                          @click="toggleSelectAll"
                        >
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
              <BRow v-else-if="nextPage" class="justify-content-center">
                <BCol md="8" class="d-flex flex-column table_background rounded-2 m-3 p-2">
                  <BCard>
                    <template #header>
                      <span class="fw-bold">Informações complementares</span>
                    </template>
                    <BCardBody class="overflow-auto responsive_options_selector">
                      <div class="d-grid gap-5">
                        <BFormSelect v-model="selected" :options="ex1Options" size="lg" />
                        <BFormSelect v-model="selected2" :options="ex2Options" size="lg" />
                        <BFormCheckbox id="checkbox-1" v-model="status" name="checkbox-1">
                          Confirmo que os dados enviados estão corretos.
                        </BFormCheckbox>
                      </div>
                    </BCardBody>
                  </BCard>
                </BCol>
              </BRow>
            </Transition>
          </BCardBody>
          <template #footer>
            <div class="d-flex gap-2 justify-content-end">
              <Transition name="fade" mode="out-in">
                <BButton
                  v-if="!nextPage"
                  class="rounded-2"
                  variant="outline-success"
                  size="lg"
                  @click="nextPage = !nextPage"
                  :disabled="files.length === 0"
                >
                  <span class="fw-semibold"> Próxima Página </span>
                </BButton>
                <BButton
                  v-else-if="nextPage"
                  :variant="variantComputed"
                  class="rounded-2"
                  type="submit"
                  v-model:disabled="disabledStatus"
                >
                  <span class="fw-semibold"> Inicializar Execução </span>
                </BButton>
              </Transition>
            </div>
          </template>
        </BCard>
      </BForm>
    </BContainer>
  </MainFrame>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
@import "../../assets/scss/colors.scss";

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

.another_options_bg {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
}

.responsive_options_selector {
  height: 55vh;

  @media (max-height: 768px) {
    max-height: 37vh;
  }

  @media (max-height: 576px) {
    max-height: 22vh;
  }
}

.responsive_dropzone {
  height: 67vh;

  @media (max-height: 768px) {
    max-height: 47vh;
  }

  @media (max-height: 576px) {
    max-height: 22vh;
  }
}

.responsive_row {
  height: 48vh;

  @media (max-height: 768px) {
    max-height: 18vh;
  }

  @media (max-height: 576px) {
    max-height: 18vh;
  }
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

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
