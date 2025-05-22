import { ipcMain, nativeTheme } from "electron";

ipcMain.handle("setTheme", (event, theme: "system" | "dark" | "light") => {
  nativeTheme.themeSource = theme;
  return nativeTheme.shouldUseDarkColors;
});

// ipcMain.handle("dark-mode:system", () => {
//   nativeTheme.themeSource = "system";
// });
