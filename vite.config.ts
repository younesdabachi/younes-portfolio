import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: '/younes-portfolio/' — GitHub Pages (site projet).
export default defineConfig({
  base: '/younes-portfolio/',
  plugins: [react(), tailwindcss()],
  esbuild: {
    // Production : aucun console.* ni debugger ne doit fuiter.
    drop: ['console', 'debugger'],
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparation vendeur : React et Framer Motion changent rarement →
          // cache navigateur long terme + téléchargements parallèles.
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
          // three + fiber : chargés en paresseux uniquement pour le hero 3D.
          three: ['three', '@react-three/fiber'],
        },
      },
    },
  },
});
