import { getDirname, path } from "@vuepress/utils";
import fs from "fs-extra";
const __dirname = getDirname(import.meta.url);
const vueSourcePlugin = {
  name: "vue-src",
  transform(code, id) {
    if (!/vue&type=src/.test(id)) {
      return;
    }
    const srcs = {};
    let files = code.split(/\n/).filter((x) => x.length);
    files = files
      .map((f) => path.resolve(path.dirname(id.split("?")[0]), f.trim()))
      .forEach((f) => {
        srcs[path.basename(f, ".vue")] = fs.readFileSync(f, "utf-8");
      });
    return `export default Comp => {
      Comp.srcs = ${JSON.stringify(srcs)}
    }`;
  },
};

export default vueSourcePlugin;
