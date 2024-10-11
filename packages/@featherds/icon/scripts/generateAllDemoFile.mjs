import { fileURLToPath } from "url";
import fsExtraPkg from "fs-extra";
import pathPkg from "path";

const { dirname } = pathPkg;
const { readFile, outputFile } = fsExtraPkg;

export const generateAllDemoFile = async (feather) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const getImport = (icon) =>
    `import ${icon.group}${icon.name} from "@featherds/icon/${icon.group}/${icon.name}";
`;
  console.log("FileName", __filename);
  console.log("DirName", __dirname);

  const htmlTemplate = await readFile(__dirname + "/allDemo.html");
  const demoTemplate = `
  ${htmlTemplate}
  <script>
  import * as components from "./../src";
${feather.map(getImport).join(`
`)}


export default {
  data(){
    return {
      featherIcons:[${feather.map(
        (icon) =>
          `{ icon: ${icon.group + icon.name}, key: "${
            icon.group + icon.name
          }" }`
      ).join(`,
        `)}]
    };
  },
  components: {
    ...components
  }
};
</script>

<style lang="scss" scoped>
@import "@featherds/styles/themes/variables";
.icons {
  font-size: 1.25rem;
  color: var($primary);
  svg {
    margin: 0.75rem;
  }
}
</style>
`;
  console.log("Generating All Demo");
  return outputFile(
    `packages/@featherds/icon/demos/AllIcons.vue`,
    demoTemplate
  );
};

// export default generateAllDemoFile;
