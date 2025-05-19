import { app, ipcMain } from "electron";

/** Returns the main BrowserWindow instance */
const GetmainWindow = async (): Promise<import("electron/main").BrowserWindow> => {
  const { mainWindow } = await import("../main");
  return mainWindow;
};

ipcMain.on("minimize", async () => {
  const mainWindow: import("electron/main").BrowserWindow = await GetmainWindow();
  mainWindow.minimize();
});

ipcMain.on("maximize", async () => {
  const mainWindow: import("electron/main").BrowserWindow = await GetmainWindow();
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close", async () => {
  app.quit();
});
