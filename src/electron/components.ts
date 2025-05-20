import { app, dialog, Menu, Notification, Tray } from "electron";
import { icon } from "./configs";
import { MainWindow } from "./ipc";

export const NotificationSuccess = new Notification({
  title: "Sucesso!",
  icon: icon,
});

export const IconTray = new Tray(icon);

export const MenuApp = Menu.buildFromTemplate([
  {
    label: "Sair",
    async click() {
      const mainWindow = await MainWindow();
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
IconTray.setContextMenu(MenuApp);
