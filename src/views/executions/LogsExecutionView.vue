<script setup lang="ts">
import { io } from "@/renderer";
import storeLogs from "@/stores/storeLogs";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const store = storeLogs();

io.on("connection", async (socket) => {
  console.log(socket);
});

io.on("log_execution", (data) => {
  this;
  const randomId = `id_${Math.random().toString(36).substring(2, 9)}`;
  store.logRef.push({ message: data.message, id: randomId });
});

onMounted(() => {
  store.pid = route.params.pid as string;
  io.emit("join_room", { pid: route.params.pid as string });
});

watch(store.logRef, (newValue) => {
  const data = store.catchNewValue();
  store.currentItem = data;
  setTimeout(() => {
    const element = document.querySelector(`li[id="${data.id}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, 500);
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
        <div class="card-body row gap-0">
          <div class="col-lg-6">
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
              <div class="card-body bg-black rounded-bottom overflow-y-scroll" style="height: 65vh">
                <TransitionGroup name="list" tag="ul">
                  <li
                    v-for="(item, index) in store.logRef"
                    :key="index"
                    class="text-white"
                    :id="item.id"
                  >
                    {{ item.message }}
                  </li>
                </TransitionGroup>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
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
