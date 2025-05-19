export const MainWindow = async () => {
  const { mainWindow } = await import("../main");
  return mainWindow;
};

export const service = "com.RemDevs.CrawJUD";
