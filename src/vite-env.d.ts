/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  // more env variables...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
} 