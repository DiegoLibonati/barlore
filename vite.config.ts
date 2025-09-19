import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    proxy: {
      "/api/json/v1/1": {
        target: "https://www.thecocktaildb.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});