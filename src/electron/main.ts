import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  !isDev ? win.loadFile("index.html") : win.loadURL("http://localhost:5173");
};

app.whenReady().then(() => {
  createWindow();
});
