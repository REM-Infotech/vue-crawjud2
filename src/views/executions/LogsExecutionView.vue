<script setup lang="ts">
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <MainFrame>
    <BContainer fluid="md" class="mt-4">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span class="fw-semibold me-3">
              <i class="fas fa-chart-pie"></i>
              <FontAwesomeIcon :icon="faPieChart" />
            </span>
            <span class="fw-semibold">Execução ID: {{ route.params.pid }} </span>
          </div>
        </div>
        <div class="card-body row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <span class="fw-semibold me-3">
                    <i class="fas fa-chart-pie"></i>
                    <FontAwesomeIcon :icon="faPieChart" />
                  </span>
                  <span class="fw-semibold">Logs {{ route.params.pid }} </span>
                </div>
              </div>
              <div class="card-body bg-black rounded-bottom" style="height: 65vh"></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <div class="card-title">
                  <span class="fw-semibold me-3">
                    <i class="fas fa-chart-pie"></i>
                    <FontAwesomeIcon :icon="faPieChart" />
                  </span>
                  <span class="fw-semibold"> Gráficos {{ route.params.pid }} </span>
                </div>
              </div>
              <div class="card-body rounded-bottom bg-opacity-75" style="height: 65vh"></div>
            </div>
          </div>
        </div>
      </div>
    </BContainer>
  </MainFrame>
</template>

<!-- <template>
  <BCard>
    <template #header>
      <span class="fw-semibold me-3">
        <i class="fas fa-chart-pie"></i>
        <FontAwesomeIcon :icon="faPieChart" />
      </span>
      <span class="fw-semibold">Execução ID: {{ route.params.pid }} </span>
    </template>
    <BCardBody>
      <BRow class="justify-content-center gap-5">
        <BCol md="5" class="d-flex flex-column responsive_logs rounded-2 p-2">
          <BCard>
            <template #header>
              <span class="fw-semibold me-3">
                <i class="fas fa-chart-pie"></i>
                <FontAwesomeIcon :icon="faPieChart" />
              </span>
              <span class="fw-semibold">Logs</span>
            </template>
            <BCardBody class="logs_content"> </BCardBody>
          </BCard>
        </BCol>
        <BCol md="5" class="d-flex flex-column responsive_logs rounded-2 p-2">
          <BCard>
            <template #header>
              <span class="fw-semibold me-3">
                <i class="fas fa-chart-pie"></i>
                <FontAwesomeIcon :icon="faPieChart" />
              </span>
              <span class="fw-semibold">Gráficos</span>
            </template>
            <BCardBody class="logs_content"> </BCardBody>
          </BCard>
        </BCol>
      </BRow>
    </BCardBody>
    <template #footer> coisas aqui </template>
  </BCard>
</template> -->

<style lang="scss" scoped>
.responsive_logs {
  height: 65vh;

  @media (max-height: 768px) {
    max-height: 65vh;
  }

  @media (max-height: 576px) {
    max-height: 65vh;
  }
}

.logs_content {
  height: 55vh;
  overflow-y: auto;
}
</style>
