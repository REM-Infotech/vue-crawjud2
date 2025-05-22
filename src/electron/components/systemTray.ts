import { app, BrowserWindow, dialog, Menu } from "electron";
import { icon } from "../configs";
import { createWindow, mainWindow } from "../windows/mainWindow";

export const MenuApp = Menu.buildFromTemplate([
  {
    id: "0",
    label: "Unminimize",
    async click() {
      try {
        if (BrowserWindow.getAllWindows().length === 0) await createWindow();
      } catch (err) {
        console.log(err);
      }
    },
  },
  {
    id: "1",
    label: "Execuções",
    type: "submenu",
    submenu: [],
    toolTip: "Listagem de execuções em andamento",
  },
  {
    id: "9",
    label: "Sair",
    async click() {
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
    },
  },
]);
