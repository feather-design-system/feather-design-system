module.exports = {
  root: true,
  env: {
    jest: true,
    jasmine: true,
    es2021: true,
    node: true,
  },
  globals: {
    browser: "readonly",
    $: "readonly",
    $$: "readonly",
  },
  extends: ["plugin:vue/vue3-essential", "@vue/prettier", "prettier"],

  parserOptions: {
    ecmaVersion: 2021,
  },
};
