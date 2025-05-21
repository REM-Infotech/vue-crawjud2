import { BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";
import { icon, modeLoadWindow, titleBarStyle } from "../configs";

export let mainWindow: BrowserWindow;
export async function createWindow() {
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

  // const view = new WebContentsView();
  // mainWindow.contentView.addChildView(view);
  // view.setBounds({ x: 0, y: 0, width: 300, height: 300 });
  // view.webContents.loadURL("https://crawjud.robotz.dev");

  // mainWindow.contentView.removeChildView(view);

  await modeLoadWindow[isDev ? "true" : "false"](mainWindow);
}
