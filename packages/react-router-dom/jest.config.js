let mappedModule;
switch (process.env.TEST_ENV) {
  case "cjs":
    mappedModule = "<rootDir>/cjs/zumper-react-router-dom.js";
    break;
  case "umd":
    mappedModule = "<rootDir>/umd/react-router-dom.js";
    break;
  default:
    mappedModule = "<rootDir>/modules/index.js";
}

module.exports = {
  testRunner: "jest-circus/runner",
  restoreMocks: true,
  globals: {
    __DEV__: true
  },
  moduleNameMapper: {
    "^@zumper/react-router-dom$": mappedModule
  },
  modulePaths: ["<rootDir>/node_modules"],
  setupFiles: ["raf/polyfill"],
  testMatch: ["**/__tests__/**/*-test.js"],
  testURL: "http://localhost/"
};
