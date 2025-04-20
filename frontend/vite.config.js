import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  base: "/B2207547_Nguyen_Trong_Nguyen_DO_AN_WEB/",

  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
  },

  build: {
    outDir: "../docs",
  },
});
