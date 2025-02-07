import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
// import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://hackathonbackend-v6i2.onrender.com", // Proxy only API routes
    },
  },
  plugins: [
    react(),
    // tailwindcss(),
  ],
  postcss: './postcss.config.js', 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

})


