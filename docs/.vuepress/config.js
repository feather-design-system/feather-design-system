// .vuepress/config.js
import { getDirname, path } from "@vuepress/utils";

const __dirname = getDirname(import.meta.url);
import { noopDirectiveTransform } from "@vue/compiler-dom";
import { sassImports } from "../../scripts/vite/alias";
import vueSourcePlugin from "./plugins/vueSourcePlugin";
import { viteBundler } from "vuepress";
import { theme } from "./theme";
import foundation from "./menus/foundation";
import components from "./menus/components";
import guides from "./menus/guides";
export default {
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
        { name: "Guides", url: "/Guides/GettingStarted/" },
      ],
      foundation,
      components,
      guides,
    },
  }),
  templateDev: path.resolve(__dirname, "./templates/dev.html"),
  templateBuild: path.resolve(__dirname, "./templates/ssr.html"),
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
