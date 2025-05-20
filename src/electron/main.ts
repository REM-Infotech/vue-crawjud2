import { initialize } from "@electron/remote/main/index";
import { app, BrowserWindow, Tray } from "electron";

import { MenuApp } from "./components/systemTray";
import { icon } from "./configs";
import "./ipc/ThemeBehavior";
import "./ipc/WinBehavior";
import { createWindow } from "./windows/mainWindow";

export let traywindow: Tray;
initialize();

const systemTray = true;

app.setAppUserModelId("com.app.RemDevs.CrawJUD");

app.whenReady().then(async () => {
  createWindow();
  const IconTray = new Tray(icon);
  IconTray.setContextMenu(MenuApp);
});

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin" && !systemTray) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
