import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { sassImports, moduleImport, fileImport } from "./scripts/vite/alias.js";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue() as any],
  resolve: {
    alias: [...sassImports, ...moduleImport, ...fileImport],
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  root: ".",
  test: {
    include: [
      "**/@featherds/*/src/**/*.spec.{js,jsx,ts,tsx}",
      "**/@featherds/composables/**/*.spec.{js,jsx,ts,tsx}",
    ],
    globals: true,
    // include the accessibility setup file so jest-axe matcher is registered
    setupFiles: ["./tests/setupA11y.ts", "./unit/setup", "./unit/serializer"],
    environment: "jsdom",
  },
});
