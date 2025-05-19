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
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
