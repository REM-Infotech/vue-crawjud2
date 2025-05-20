import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { icon } from "../configs";
/** Returns the main BrowserWindow instance */
const GetmainWindow = async (): Promise<BrowserWindow> => {
  const { mainWindow } = await import("../main");
  return mainWindow;
};

ipcMain.on("minimize", async () => {
  const mainWindow: BrowserWindow = await GetmainWindow();
  mainWindow.minimize();
});

ipcMain.on("maximize", async () => {
  const mainWindow: BrowserWindow = await GetmainWindow();
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("close", async () => {
  const { mainWindow } = await import("../main");

  const mensagem_sair = await dialog.showMessageBox(mainWindow, {
    type: "question",
    message: "Deseja realmente sair?",
    buttons: ["Sim", "Não"],
    defaultId: 1,
    cancelId: 1,
    title: "Sair",
    noLink: true,
    icon: icon,
  });

  if (mensagem_sair.response === 0) {
    app.quit();
  }
});
