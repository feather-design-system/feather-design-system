const { paramCase } = require("change-case");

module.exports = [
  {
    type: "input",
    name: "package",
    message: "Package name",
    validate(value) {
      if (!value.length) {
        return "Packages must have a name.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "component",
    message: "Component name",
    validate(value) {
      if (!value.length) {
        return "Components must have a name.";
      }
      const fileName = paramCase(value);
      if (fileName.indexOf("-") === -1) {
        return "Component names should contain at least two words to avoid conflicts with existing and future HTML elements.";
      }
      return true;
    },
  },
];
