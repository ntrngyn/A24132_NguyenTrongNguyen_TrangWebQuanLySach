import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "./",

  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: "https://a24132-nguyentrongnguyen.onrender.com",
  },

  build: {
    outDir: "../docs",
  },
});
