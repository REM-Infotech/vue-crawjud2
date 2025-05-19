import { initialize } from "@electron/remote/main/index";
import { app, BrowserWindow, Tray } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";
import { icon, modeLoadWindow, titleBarStyle } from "./configs";
import "./ipc/ThemeBehavior";
import "./ipc/WinBehavior";

export let traywindow: Tray;
export let mainWindow: BrowserWindow;

app.setAppUserModelId("com.app.RemDevs.CrawJUD");

const createWindow = async () => {
  initialize();

  mainWindow = new BrowserWindow({
    icon: icon,
    minWidth: 1280,
    minHeight: 720,
    width: 1280,
    height: 720,
    titleBarStyle: titleBarStyle(),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: join(__dirname, "./preload.js"),
    },
  });

  await modeLoadWindow[isDev ? "true" : "false"](mainWindow);
  await import("./components");
};

app.whenReady().then(createWindow);

app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
