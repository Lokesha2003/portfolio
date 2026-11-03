import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// If you deploy to GitHub Pages under /portfolio/, set base to '/portfolio/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2022',
    cssMinify: true,
  },
});
