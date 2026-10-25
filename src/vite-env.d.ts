/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Clé d'accès Web3Forms (voir .env.example). Optionnelle : sans elle, repli mailto. */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
