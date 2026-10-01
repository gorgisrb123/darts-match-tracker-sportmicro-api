/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly SPORTMICRO_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
