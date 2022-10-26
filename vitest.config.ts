import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { sassImports, moduleImport, fileImport } from "./scripts/vite/alias.js";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [...sassImports, ...moduleImport, ...fileImport],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  root: ".",
  test: {
    include: [
      "**/@featherds/*/src/**/*.spec.(js|jsx|ts|tsx)",
      "**/@featherds/composables/**/*.spec.(js|jsx|ts|tsx)",
    ],
    globals: true,
    setupFiles: ["./unit/setup", "./unit/serializer"],
    environment: "jsdom",
  },
});
