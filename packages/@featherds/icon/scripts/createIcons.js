const globby = require("globby");
const path = require("path");
const fs = require("fs-extra");
const changeCase = require("change-case");
const vite = require("./vite");
const lodash = require("lodash");
const generateAllDemoFile = require("./generateAllDemoFile");
const PACKAGE_DIR = "packages/@featherds/icon";
const FEATHER_DEST_DIR = PACKAGE_DIR;
const IGNORE_FOLDERS = [
  "demos",
  "docs",
  "dist",
  "src",
  "scripts",
  "node_modules",
];

const getVueFileContent = (content) => `<template>${content}</template>`;

async function generateComponentFiles(files, packageDir, destDir, reg) {
  console.log(`Found ${files.length} icons`);
  return Promise.all(
    files.map(async (file) => {
      //get group name of file
      const group = path
        .relative(packageDir, file)
        .split(path.sep)[0]
        .replace(/[\s_]/g, "-");
      const svg = await fs.readFile(file);
      const destFolder = path.join(destDir, group);
      const arr = new RegExp(reg).exec(file);
      const name = changeCase.pascalCase(arr[1]).replace(/_/g, "");
      await fs.outputFile(path.join(destFolder, `${name}.svg`), svg);
      await fs.outputFile(
        path.join(destFolder, `${name}.vue`),
        getVueFileContent(svg)
      );
      return { group, name };
    })
  );
}

async function generateFeatherIconComponents() {
  const globs = IGNORE_FOLDERS.map((x) => `!packages/@featherds/icon/${x}/**`);
  globs.push("packages/@featherds/icon/**/ic_*.svg");
  const files = await globby(globs);
  const packageDir = path.resolve(`${process.cwd()}/packages/@featherds/icon`);
  return generateComponentFiles(
    files,
    packageDir,
    FEATHER_DEST_DIR,
    /ic_(.*)\.svg/g
  );
}

async function generateFeatherJSFiles() {
  const folders = await (
    await fs.readdir(FEATHER_DEST_DIR)
  ).filter((name) => {
    return (
      fs.lstatSync(path.join(FEATHER_DEST_DIR, name)).isDirectory() &&
      IGNORE_FOLDERS.indexOf(name) === -1
    );
  });
  console.log("Compiling vue files to JS then remove vue files");
  return Promise.all(
    folders.map(async (folder) => {
      const files = await globby(`${FEATHER_DEST_DIR}/${folder}/*vue`);
      try {
        await vite.run(`${FEATHER_DEST_DIR}/${folder}`, files);
      } catch (e) {
        console.error(e);
      }
      return Promise.all(files.map((f) => fs.remove(f)));
    })
  );
}

const moveIconsToDocs = (srcRoot, suffix) => async (icons) => {
  const paths = icons.map((icon) => ({
    src: `${srcRoot}/${icon.group}/${icon.name}.svg`,
    dest: `./docs/.vuepress/public/assets/Packages/Icon/${icon.group}${suffix}${icon.name}.svg`,
  }));
  console.log("Moving " + suffix + " Icons to doc assets");
  return Promise.all(
    paths.map((p) => {
      fs.move(p.src, p.dest, { overwrite: true });
    })
  );
};
const moveFeatherIconsToDocs = moveIconsToDocs(FEATHER_DEST_DIR, "Feather");

const generateTypeDefinitions = async (feather) => {
  const getIconModuleDefinition = (icon) =>
    `declare module "@featherds/icon/${icon.group}/${icon.name}" {
  import { defineComponent } from "vue";
  const compModule: ReturnType<typeof defineComponent>;
  export = compModule;
}
`;
  const defintionTemplate = `declare module "@featherds/icon" {
  import { defineComponent } from "vue";
  const FeatherIcon: ReturnType<typeof defineComponent>;
  export { FeatherIcon };
}
${feather.map(getIconModuleDefinition).join(`
`)}
`;
  console.log("Generating Defintions");
  return fs.outputFile(`${PACKAGE_DIR}/src/index.d.ts`, defintionTemplate);
};

(async () => {
  const featherIcons = await generateFeatherIconComponents();
  const group = (icons) => {
    const groups = lodash.groupBy(icons, (x) => x.group);
    return lodash.sortBy(
      Object.keys(groups).map((key) => {
        return {
          group: key,
          icons: groups[key],
        };
      }),
      "group"
    );
  };
  await Promise.all([
    generateFeatherJSFiles(),
    moveFeatherIconsToDocs(featherIcons),
    fs.outputJson(`./docs/.vuepress/components/Icon/icons.json`, {
      feather: group(featherIcons),
    }),
    generateTypeDefinitions(featherIcons),
    generateAllDemoFile(featherIcons),
  ]);
})();
