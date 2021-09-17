const globby = require("globby");
const path = require("path");
const fs = require("fs-extra");
const { pascalCase } = require("change-case");
const { getPackageName } = require("./utils");
module.exports = (async () => {
  const globs = [`packages/@featherds/*/demos/*.vue`];
  const files = await globby(globs, {
    cwd: process.cwd(),
  });
  console.log(files);
  const routes = {};
  files.forEach((file) => {
    const fileName = pascalCase(path.basename(file, ".vue"));
    const packageName = pascalCase(getPackageName(file));
    routes[packageName] = routes[packageName] || [];
    routes[packageName].push({
      name: fileName,
      componentName: `${packageName}${fileName}`,
      route: `/${packageName}-${fileName}`,
      component: path.relative(__dirname, file).replace(/\\/g, "/"),
    });
  });
  //create routes file
  const routesFile = "./demo/routes.js";

  const requiresTemplate = `
  import { defineAsyncComponent } from "vue";
  import Home from "./Home.vue";`;

  const routesExports = `
      export default [
        {path:"",component:Home},
        {path:"/",component:Home},
        ${Object.values(routes)
          .map((arr) =>
            arr
              .map(
                ({ route, component }) =>
                  `{path:"${route}",component:() => import("${component}")},`
              )
              .join("\n")
          )
          .join("\n")}

      ];
  `;
  await fs.remove(routesFile);

  await fs.outputFile(routesFile, `${requiresTemplate}${routesExports}`);

  const homeFile = "./demo/Home.vue";
  const homeTemplate = `<template>
<div>
    ${Object.keys(routes)
      .map((key) => {
        const header = `<h3>${key}</h3>\n`;
        const lis = routes[key]
          .map(
            ({ route, name }) => `
      <li><router-link to="${route}">${name}</router-link></li>
      `
          )
          .join("\n");
        return `${header}<ul>${lis}</ul>`;
      })
      .join("\n")}
      </div>
</template>`;
  await fs.remove(homeFile);

  await fs.outputFile(homeFile, homeTemplate);

  // const linter = new Service(process.cwd());
  // //lint the files we just created to avoid unncessary errors
  // return linter.run("lint", { _: ["", "./demo/"] });
})();
