module.exports = {
  testEnvironment: "jsdom",
  snapshotSerializers: ["<rootDir>/jest/serializer"],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],

  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
  },

  transformIgnorePatterns: ["/node_modules/"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
  },

  testPathIgnorePatterns: ["<rootDir>/(?:.+?)/e2e/"],

  testMatch: ["**/@featherds/*/src/**/*.spec.(js|jsx|ts|tsx)"],

  testURL: "http://localhost/",

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],

  testResultsProcessor: "jest-teamcity-reporter",
  collectCoverage: true,

  collectCoverageFrom: [
    "**/@featherds/*/src/**/*.{js,ts,vue}",
    "!**/node_modules/**",
  ],

  coverageReporters: ["text"],
};
