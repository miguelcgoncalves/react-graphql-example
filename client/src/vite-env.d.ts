/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_WEBSOCKET_ADDRESS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
