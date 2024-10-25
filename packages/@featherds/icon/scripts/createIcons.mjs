import globby from "globby";
import { relative, sep, join, resolve } from "path";
import fsExtraPkg from "fs-extra";
import changeCasePkg from "change-case";
import lodashPkg from "lodash";
import { run } from "./vite.mjs";
import { generateAllDemoFile } from "./generateAllDemoFile.mjs";

const { readFile, outputFile, readdir, lstatSync, remove, move, outputJson } =
  fsExtraPkg;
const { groupBy, sortBy } = lodashPkg;
const { pascalCase } = changeCasePkg;

const PACKAGE_DIR = "packages/@featherds/icon";
const FEATHER_DEST_DIR = PACKAGE_DIR;
const IGNORE_FOLDERS = [
  "status",
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
      const group = relative(packageDir, file)
        .split(sep)[0]
        .replace(/[\s_]/g, "-");
      const svg = await readFile(file);
      const destFolder = join(destDir, group);
      const arr = new RegExp(reg).exec(file);
      const name = pascalCase(arr[1]).replace(/_/g, "");
      await outputFile(join(destFolder, `${name}.svg`), svg);
      await outputFile(join(destFolder, `${name}.vue`), getVueFileContent(svg));
      return { group, name };
    })
  );
}

async function generateFeatherIconComponents() {
  const globs = IGNORE_FOLDERS.map((x) => `!packages/@featherds/icon/${x}/**`);
  globs.push("packages/@featherds/icon/**/ic_*.svg");
  const files = await globby(globs);
  const packageDir = resolve(`${process.cwd()}/packages/@featherds/icon`);

  console.log("createComponentFiles packageDir: ", packageDir);

  return generateComponentFiles(
    files,
    packageDir,
    FEATHER_DEST_DIR,
    /ic_(.*)\.svg/g
  );
}

async function generateFeatherJSFiles() {
  // const folders = await (
  const folders = (
    await readdir(FEATHER_DEST_DIR)
  ).filter((name) => {
    return (
      lstatSync(join(FEATHER_DEST_DIR, name)).isDirectory() &&
      IGNORE_FOLDERS.indexOf(name) === -1
    );
  });
  console.log("Compiling vue files to JS then remove vue files");
  return Promise.all(
    folders.map(async (folder) => {
      const files = await globby(`${FEATHER_DEST_DIR}/${folder}/*vue`);
      console.log("createIcons files", folder, files);
      try {
        await run(`${FEATHER_DEST_DIR}/${folder}`, files);
      } catch (e) {
        console.error(e);
      }
      return Promise.all(files.map((f) => remove(f)));
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
      move(p.src, p.dest, { overwrite: true });
    })
  );
};
const moveFeatherIconsToDocs = moveIconsToDocs(FEATHER_DEST_DIR, "Feather");

const generateTypeDefinitions = async (feather) => {
  const createIconModuleDefinition = (icon) => {
    const declaration = `declare module "@featherds/icon/${icon.group}/${icon.name}" {
  import { DefineComponent } from "vue";
  const compModule: DefineComponent;
  export { compModule as default };
}
`;
    console.log(`Generating definition ${icon.group}/${icon.name}.d.ts`);
    return outputFile(
      `${PACKAGE_DIR}/${icon.group}/${icon.name}.d.ts`,
      declaration
    );
  };
  await feather.reduce((p, icon) => {
    return p.then(() => {
      return createIconModuleDefinition(icon);
    });
  }, Promise.resolve());
  const defintionTemplate = `declare module "@featherds/icon" {
  import { DefineComponent } from "vue";
  const FeatherIcon: DefineComponent<typeof import("./components/FeatherIcon.vue").props>;
  export { FeatherIcon };
}
`;
  console.log("Generating definition index.d.ts");
  return outputFile(`${PACKAGE_DIR}/src/index.d.ts`, defintionTemplate);
};

(async () => {
  const featherIcons = await generateFeatherIconComponents();
  const group = (icons) => {
    const groups = groupBy(icons, (x) => x.group);
    return sortBy(
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
    outputJson(`./docs/.vuepress/examples/Icon/icons.json`, {
      feather: group(featherIcons),
    }),
    generateTypeDefinitions(featherIcons),
    generateAllDemoFile(featherIcons),
  ]);
})();
