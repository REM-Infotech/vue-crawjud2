/**
 * Electron Main Process Entry Point
 *
 * This file initializes the Electron app, sets up the system tray, and handles window events.
 *
 * Layers:
 * - Domain: Application business logic (not present in this file, should be in /domain)
 * - Application: Application services (window and tray management)
 * - Infrastructure: Electron and OS integration
 */

import { initialize } from "@electron/remote/main/index";
import { app, BrowserWindow, Tray } from "electron";
import { MenuApp } from "./components/systemTray";
import { icon } from "./configs";
import "./ipc/ThemeBehavior";
import "./ipc/WinBehavior";
import { createWindow } from "./windows/mainWindow";

/**
 * Infrastructure Layer: System Tray Handler
 */
export let traywindow: Tray;

initialize();

const systemTrayEnabled = true;

app.setAppUserModelId("com.app.RemDevs.CrawJUD");

/**
 * Application Layer: Handles app ready event
 */
app.whenReady().then(async () => {
  createWindow();
  traywindow = createSystemTray();
});

/**
 * Creates and configures the system tray icon and menu.
 * @returns {Tray} The created Tray instance.
 */
function createSystemTray(): Tray {
  const tray = new Tray(icon);
  tray.setContextMenu(MenuApp);
  return tray;
}

/**
 * Application Layer: Handles all windows closed event
 */
app.on("window-all-closed", async () => {
  if (process.platform !== "darwin" && !systemTrayEnabled) {
    app.quit();
  }
});

/**
 * Application Layer: Handles app activation (macOS)
 */
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
