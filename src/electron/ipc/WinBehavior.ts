import { app, BrowserWindow, dialog, ipcMain, MenuItem } from "electron";
import sio from "socket.io-client";
import { url_socket } from "../addons/socketio";
import { MenuApp } from "../components/systemTray";
import { icon } from "../configs";
import { createWindow, mainWindow } from "../windows/mainWindow";

/**
 * Domain: SystemTray
 * Handles system tray related behaviors.
 */
const systemTrayEnabled = true;

/**
 * Domain: WinBehavior
 * Handles window behavior events (minimize, maximize, close).
 */
class WinBehavior {
  /**
   * Minimizes the main window.
   */
  static minimizeWindow() {
    mainWindow.minimize();
  }

  /**
   * Toggles maximize/unmaximize for the main window.
   */
  static toggleMaximizeWindow() {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }

  /**
   * Handles the close event, showing a confirmation dialog if system tray is disabled.
   */
  static async handleClose() {
    if (!systemTrayEnabled) {
      const result = await dialog.showMessageBox(mainWindow, {
        type: "question",
        message: "Deseja realmente sair?",
        buttons: ["Sim", "Não"],
        defaultId: 1,
        cancelId: 1,
        title: "Sair",
        noLink: true,
        icon: icon,
      });

      if (result.response === 0) {
        app.quit();
        return;
      }
    }
    mainWindow.close();
  }
}

/**
 * Domain: ExecutionMenu
 * Handles dynamic addition of execution menu items.
 */
class ExecutionMenu {
  /**
   * Adds a new execution item to the menu and sets up socket events.
   * @param pid Process ID to add to the menu.
   */
  static async addExecution(pid: string) {
    const menuExecutions = MenuApp.getMenuItemById("1");
    const index = (menuExecutions.submenu.getMaxListeners() + 1).toString();
    menuExecutions.submenu.append(
      new MenuItem({
        id: index,
        label: pid,
        type: "normal",
        click: async (menuItem) => {
          if (BrowserWindow.getAllWindows().length === 0) await createWindow();
          const io = sio(url_socket, { transports: ["websocket"] });
          io.emit("join_room", { pid: menuItem.label });
          io.emit("push_route", { pid: menuItem.label });
        },
        sublabel: "",
        toolTip: "",
      }),
    );
  }
}

// IPC Event Bindings

ipcMain.on("minimize", WinBehavior.minimizeWindow);

ipcMain.on("maximize", WinBehavior.toggleMaximizeWindow);

ipcMain.on("add_execution", async (_, pid: string) => {
  await ExecutionMenu.addExecution(pid);
});

ipcMain.on("close", WinBehavior.handleClose);
