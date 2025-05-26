<script setup lang="ts">
import "@/assets/scss/main.scss";
import { io } from "@/renderer";
import { OptionType } from "@/types/bot";
import { botRecord } from "@/types/botArray";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { styled } from "@vue-styled-components/core";
import {
  BButton,
  BCard,
  BCardBody,
  BCol,
  BContainer,
  BForm,
  BFormCheckbox,
  BFormSelect,
  BProgress,
  BRow,
} from "bootstrap-vue-next";
import { computed, onBeforeMount, onUnmounted, ref, watch } from "vue";
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
  addFiles,
  percentProgress,
} = FormSetup();

let params: botRecord;

const CardContentProps = { minSize: Number, maxSize: Number };
const containsSheet = ref(false);
const maxSize = ref(window.innerHeight - 500);
const minSize = ref(window.innerHeight - 500);
const router = useRouter();

const ex1Options = ref<OptionType[]>([]);
const ex2Options = ref<OptionType[]>([]);

const CardContent = styled("div", CardContentProps)`
  max-height: ${(props) => props.maxSize}px;
  min-height: ${(props) => props.minSize}px;
`;

const xlsx_file = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

onBeforeMount(() => {
  params = route.params as unknown as botRecord;

  io.emit(
    "get_selectors_data",
    { system: route.params.system },
    (data: Record<string, OptionType[]>) => {
      ex1Options.value = data.credentials;
      ex2Options.value = data.other_info;
    },
  );
});

onUnmounted(() => {
  nextPage.value = false;
});

watch(files, () => {
  const validade = files.value.some((f) => f.type === xlsx_file);
  containsSheet.value = validade;
});

watch(percentProgress, (newvalue) => {
  console.log("testeste", newvalue);
});

const countPercent = computed(() => percentProgress.value >= 100);

async function handleSubmit(event: Event) {
  event.preventDefault();
  router.push({ name: "logs_execution", params: { pid: "Q9M1E6" } });
  window.electronAPI.add_execution("Q9M1E6");
}
const handleResize = () => {
  maxSize.value = window.innerHeight - 500;
  minSize.value = window.innerHeight - 500;
};

window.addEventListener("resize", handleResize);
</script>

<template>
  <BContainer fluid="md" class="mt-4">
    <BForm @submit="handleSubmit">
      <div class="card">
        <div class="card-header">
          <h5 class="text-center">{{ params.display_name }}</h5>
        </div>
        <div class="card-body overflow-y-auto" style="max-height: 75vh; min-height: 75vh">
          <CardContent>
            <Transition name="fade" mode="out-in">
              <div v-if="!nextPage" class="row justify-content-between">
                <CardContent
                  class="col-4 d-flex flex-column dropzone_background responsive_dropzone rounded-2 p-2"
                >
                  <DropZone
                    v-model="FormBot.files"
                    @files-dropped="
                      (files) => {
                        addFiles(files);
                      }
                    "
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

                  <Transition name="fade">
                    <div v-if="percentProgress > 0 && !(percentProgress === 100)">
                      <BProgress variant="info" :value="percentProgress" striped animated />
                    </div>
                  </Transition>
                </CardContent>
                <div
                  class="col-8 d-flex flex-column table_background responsive_dropzone rounded-2 p-2"
                >
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
                    <BCardBody>
                      <CardContent
                        :minSize="minSize"
                        :maxSize="maxSize"
                        class="overflow-y-auto overflow-x-hidden"
                      >
                        <TransitionGroup name="list" tag="ul">
                          <ListFiles
                            v-for="item in files"
                            :files="item"
                            :key="item.name"
                            :selected="selectedFiles.includes(item.name)"
                            @update:selected="(selected) => updateSelection(item.name, selected)"
                          />
                        </TransitionGroup>
                      </CardContent>
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
                </div>
              </div>
              <BRow v-else-if="nextPage" class="justify-content-center">
                <BCol md="8" class="d-flex flex-column rounded-2 p-3">
                  <BCard>
                    <template #header>
                      <span class="fw-bold">Informações complementares</span>
                    </template>
                    <BCardBody class="overflow-auto responsive_options_selector">
                      <CardContent
                        :minSize="minSize"
                        :maxSize="maxSize"
                        class="overflow-y-auto overflow-x-hidden"
                      >
                        <div class="d-grid gap-5">
                          <BFormSelect v-model="selected" :options="ex1Options" size="lg" />
                          <BFormSelect v-model="selected2" :options="ex2Options" size="lg" />
                          <BFormCheckbox id="checkbox-1" v-model="status" name="checkbox-1">
                            Confirmo que os dados enviados estão corretos.
                          </BFormCheckbox>
                        </div>
                      </CardContent>
                    </BCardBody>
                  </BCard>
                </BCol>
              </BRow>
            </Transition>
          </CardContent>
        </div>
        <div class="card-footer">
          <div class="d-flex gap-2 justify-content-end">
            <Transition name="fade" mode="out-in">
              <BButton
                v-if="nextPage"
                variant="outline-primary"
                class="rounded-2"
                @click="nextPage = !nextPage"
              >
                <span class="fw-semibold"> Voltar </span>
              </BButton>
            </Transition>
            <Transition name="fade" mode="out-in">
              <BButton
                v-if="!nextPage"
                class="rounded-2"
                variant="outline-success"
                size="lg"
                @click="nextPage = !nextPage"
                :disabled="files.length === 0 || !countPercent"
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
        </div>
      </div>
    </BForm>
  </BContainer>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";
@import "../../assets/scss/colors.scss";

$content-height: 200px;

.files-card {
  max-height: $content-height;
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

.another_options_bg {
  transition:
    background-color 0.4s ease,
    color 0.4s ease;
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
