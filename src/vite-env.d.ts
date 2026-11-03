/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional form endpoint (e.g. Formspree). When unset, the contact form opens the visitor's email app instead. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
