import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // in development, forward API + uploaded files to the Express backend
    proxy: {
      "/api": "http://localhost:9000",
      "/uploads": "http://localhost:9000",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["bootstrap", "sweetalert2", "react-icons"],
        },
      },
    },
  },
});
