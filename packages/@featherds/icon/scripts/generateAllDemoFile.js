const fs = require("fs-extra");

const generateAllDemoFile = async (feather) => {
  const getImport = (icon) =>
    `import ${icon.group}${
      icon.name
    } from "@featherds/icon/${icon.group}/${
      icon.name
    }";
`;

  const htmlTemplate = await fs.readFile(__dirname + "/allDemo.html");
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
@import "~@featherds/styles/themes/variables";
.icons {
  font-size: 20px;
  color: var($primary);
  svg {
    margin: 12px;
  }
}
</style>
`;
  console.log("Generating All Demo");
  return fs.outputFile(
    `packages/@featherds/icon/demos/AllIcons.vue`,
    demoTemplate
  );
};

module.exports = generateAllDemoFile;
