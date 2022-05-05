// .vuepress/config.js

const path = require("path");
const { sassImports } = require("../../scripts/vite/alias");
const { noopDirectiveTransform } = require("@vue/compiler-dom");
const vueSourcePlugin = require("./plugins/vueSourcePlugin");
const { viteBundler } = require("vuepress");
const { theme } = require("./theme");
module.exports = {
  title: "Feather DS",
  theme: theme({
    footerComponent: "Footer",
    brandLogoLargeComponent: "FeatherLogoFull",
    brandLogoSmallComponent: "FeatherLogoMotif",
    errorLogoComponent: "AtomError",
    menus: {
      header: [
        { name: "Foundation", url: "/Foundation/Story/Philosophy" },
        { name: "Components", url: "/Components/" },
      ],
      foundation: require("./menus/foundation"),
      components: require("./menus/components"),
    },
  }),
  templateDev: path.resolve(__dirname, "./templates/dev.html"),
  templateSSR: path.resolve(__dirname, "./templates/ssr.html"),
  patterns: ["README.md", "Components/**/*.md", "Foundation/**/*.md"],
  markdown: { code: { lineNumbers: false } },
  bundler: viteBundler({
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
  }),
};
