export default {
  testEnvironment: "jsdom",
  snapshotSerializers: ["<rootDir>/jest/serializer"],
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts"],
  setupFiles: ["<rootDir>/jest/setup"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },

  transformIgnorePatterns: ["/node_modules/"],

  moduleNameMapper: {
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^@featherds/([a-z-/]+)/(.*)": "<rootDir>/packages/@featherds/$1/$2",
    "^@featherds/([a-z-]+)$": "<rootDir>/packages/@featherds/$1/src/",
    "^@featherds/(?!composables)([a-z-/]+)/(.*)":
      "<rootDir>/packages/@featherds/$1/$2",
  },

  testPathIgnorePatterns: ["<rootDir>/(?:.+?)/e2e/"],

  testMatch: ["**/@featherds/*/src/**/*.spec.(js|jsx|ts|tsx)"],

  testURL: "http://localhost/",

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  testResultsProcessor: "jest-teamcity-reporter",
  collectCoverage: false,

  collectCoverageFrom: [
    "**/@featherds/*/src/**/*.{js,ts,vue}",
    "!**/node_modules/**",
  ],

  coverageReporters: ["text"],
};
