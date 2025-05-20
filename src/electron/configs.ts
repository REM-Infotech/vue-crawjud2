import type { BrowserWindow } from "electron";
import { app } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";
import type { LoadWindow, TtitleBarStyle } from "../types/service";
export let icon: string;

if (!isDev) {
  icon =
    process.platform === "win32"
      ? join(__dirname, "../assets", "brand", "icon.ico")
      : join(__dirname, "../assets", "brand", "icon.png");
} else if (isDev) {
  icon =
    process.platform === "win32"
      ? join(app.getAppPath(), "src", "assets", "brand", "icon.ico")
      : join(app.getAppPath(), "src", "assets", "brand", "icon.png");
}

export const modeLoadWindow: LoadWindow = {
  true: async (mainWindow: BrowserWindow) => {
    await mainWindow.loadURL("http://localhost:5173");
  },
  false: async (mainWindow: BrowserWindow) => {
    await mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  },
};

export const titleBarStyle: TtitleBarStyle = () => {
  if (!isDev) {
    return "hidden";
  }
  return "default";
};
