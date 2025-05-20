import { app, BrowserWindow, dialog, ipcMain, MenuItem } from "electron";
import sio from "socket.io-client";
import { url_socket } from "../addons/socketio";
import { MenuApp } from "../components/systemTray";
import { icon } from "../configs";
import { createWindow, mainWindow } from "../windows/mainWindow";
/** Returns the main BrowserWindow instance */
const systemTray = true;

ipcMain.on("minimize", async () => {
  mainWindow.minimize();
});

ipcMain.on("maximize", async () => {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }
});

ipcMain.on("add_execution", async (_, pid: string) => {
  const MenuExecutions = MenuApp.getMenuItemById("1");
  const index = (MenuExecutions.submenu.getMaxListeners() + 1).toString();
  MenuExecutions.submenu.append(
    new MenuItem({
      id: index,
      label: pid,
      type: "normal",
      click: async (menuItem) => {
        if (BrowserWindow.getAllWindows().length === 0) await createWindow();
        const pid = menuItem.label;
        const io = sio(url_socket, {
          transports: ["websocket"],
        });
        io.emit("join_room", { pid: pid });
        io.emit("push_route", { pid: pid });
      },
      sublabel: "",
      toolTip: "",
    }),
  );
});

ipcMain.on("close", async () => {
  if (!systemTray) {
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
  }
  mainWindow.close();
});
