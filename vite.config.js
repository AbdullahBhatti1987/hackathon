import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';
import path from "path";

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://lmsportalb.onrender.com", // Proxy only API routes
    },
  },
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically open the stats in the browser
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Adjust the chunk size limit as needed
  }

})


