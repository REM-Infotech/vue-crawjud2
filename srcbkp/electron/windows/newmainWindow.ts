import { WindowConfig } from "@/types/WindowConfig";
import { BrowserWindow } from "electron";
import { WindowLoader } from "../ports/WindowLoader";

/**
 * Serviço responsável por criar e gerenciar a janela principal da aplicação.
 */
export class MainWindowService {
  private mainWindow?: BrowserWindow;

  constructor(
    private config: WindowConfig,
    private loader: WindowLoader,
  ) {}

  /**
   * Cria e exibe a janela principal.
   */
  async createWindow(): Promise<BrowserWindow> {
    this.mainWindow = new BrowserWindow(this.config);
    await this.loader.load(this.mainWindow);
    return this.mainWindow;
  }

  /**
   * Retorna a instância da janela principal.
   */
  getWindow(): BrowserWindow | undefined {
    return this.mainWindow;
  }
}
