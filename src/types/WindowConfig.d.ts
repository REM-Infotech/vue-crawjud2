interface WindowConfig {
  icon?: string;
  minWidth?: number;
  minHeight?: number;
  width?: number;
  height?: number;
  titleBarStyle?: string;
  webPreferences?: {
    contextIsolation?: boolean;
    nodeIntegration?: boolean;
    preload?: string;
  };
}

export type { WindowConfig };
