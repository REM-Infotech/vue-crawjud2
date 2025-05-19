import { createMemoryHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/auth/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dash/DashboardView.vue"),
  },
  {
    path: "/bots",
    name: "bots",
    component: () => import("../views/bots/BotsView.vue"),
  },
  {
    path: "/bot/:id/:system/:type/:display_name",
    name: "bot_form",
    component: () => import("../views/bots/FormBotView.vue"),
  },
  {
    path: "/logs_execution/:pid",
    name: "logs_execution",
    component: () => import("../views/executions/LogsExecutionView.vue"),
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
