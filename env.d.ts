/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly API_REST_URL: string;
  readonly VITE_SOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  electronAPI: {
    maximize: () => void;
    minimize: () => void;
    close: () => void;
    perform: (form: formType) => void;
    file_save: (file: string, csrf_token: string, api_key: string) => Promise<void>;
    SaveCredentials: (key: string, password: string) => Promise<void>;
    RemoveCredentials: (key: string) => Promise<void>;
    getAllCredentials: () => Promise<Array<{ account: string; password: string }>>;
    getCredentials: () => Promise<Array<{ account: string; password: string }>>;
    AlertError: () => Promise<void>;
  };

  ThemeChoser: {
    toggle: () => Promise<void>;
  };
}

declare module "*.vue" {}
declare module "*.module.scss" {}
declare module "*.css" {}
declare module "*.json" {}
declare module "*.svg" {}
