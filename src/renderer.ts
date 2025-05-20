import { createBootstrap } from "bootstrap-vue-next";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/css/bootstrap.css";
import { createPinia } from "pinia";
import sio from "socket.io-client";
import { createApp } from "vue";

import "./assets/scripts/color-modes";
import "./assets/scss/main.css";
const url_socket = import.meta.env.VITE_SOCKET_URL + "/logs";

import App from "./App.vue";
import { router } from "./router";
const app = createApp(App);
const bootstrap = createBootstrap();
export const pinia = createPinia();
app.use(bootstrap); // Important
app.use(pinia);
app.use(router);
export const io = sio(url_socket, {
  transports: ["websocket"],
});
app.mount("#app");
io.on("connect", () => {
  console.log("connected!");
});

io.on("push_route", (data: Record<string, string>) => {
  router.push({ name: "logs_execution", params: { pid: data["pid"] } });
});
