// .vuepress/config.js
const path = require("path");
const utils = require("../../scripts/utils");
const { sassImports } = require("../../scripts/vite/alias");
const { noopDirectiveTransform } = require("@vue/compiler-dom");
const vueSourcePlugin = require("./plugins/vueSourcePlugin");
module.exports = {
  title: "Feather",
  base: "/FeatherDS/",
  theme: path.resolve(__dirname, "./theme"),
  patterns: [
    "README.md",
    "Components/**/*.md",
    "Patterns/**/*.md",
    "Packages/**/*.md",
    "Help/**/*.md",
  ],
  markdown: { code: { lineNumbers: false } },
  bundler: "@vuepress/vite",
  bundlerConfig: {
    viteOptions: {
      resolve: {
        extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
        alias: [...sassImports],
      },
      plugins: [vueSourcePlugin],
    },
    vuePluginOptions: {
      template: {
        compilerOptions: {
          directiveTransforms: {
            "row-action": noopDirectiveTransform,
          },
        },
      },
    },
  },
};
