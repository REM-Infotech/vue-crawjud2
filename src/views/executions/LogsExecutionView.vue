<script setup lang="ts">
import { socket } from "@/addons/socketio";
import storeLogs from "@/stores/storeLogs";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRoute } from "vue-router";
const route = useRoute();
const store = storeLogs();

socket.on("connection", (io) => {
  io.join(route.params.pid);
});

socket.on("log_execution", (data) => {
  console.log(data);
  store.logRef.push(data);
});
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
              <div class="card-body bg-black rounded-bottom" style="height: 65vh">
                <TransitionGroup name="list" tag="ul">
                  <li v-for="item in store.logRef" :key="item">
                    {{ item }}
                  </li>
                </TransitionGroup>
              </div>
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
