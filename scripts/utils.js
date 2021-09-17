const pkg = require("../lerna.json");

const getPackageName = path => {
  const dirs = path.split("/");
  return dirs[dirs.indexOf("@featherds") + 1];
};
const getFilter = () => {
  if (process.argv.length > 2) {
    return process.argv.pop();
  }
  return "*";
};

const isFeature = () => pkg.version.split(".")[0] === "0";
const getFeatureVersion = () => pkg.version.replace(/\./g, "/").split("-")[0];
module.exports = {
  getPackageName,
  getFilter,
  isFeature,
  getFeatureVersion
};
