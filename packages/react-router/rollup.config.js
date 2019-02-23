const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");
import { terser } from "rollup-plugin-terser";
import kebabCase from "lodash.kebabcase";

const pkg = require("./package.json");

const fileName = kebabCase(pkg.name);
function isBareModuleId(id) {
  return !id.startsWith(".") && !id.startsWith("/");
}

const cjs = [
  {
    input: "modules/index.js",
    output: { file: `cjs/${fileName}.js`, format: "cjs" },
    external: isBareModuleId,
    plugins: [
      babel({ exclude: /node_modules/ }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env.BUILD_FORMAT": JSON.stringify("cjs")
      })
    ]
  },
  {
    input: "modules/index.js",
    output: { file: `cjs/${fileName}.min.js`, format: "cjs" },
    external: isBareModuleId,
    plugins: [
      babel({ exclude: /node_modules/ }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.BUILD_FORMAT": JSON.stringify("cjs")
      }),
      terser()
    ]
  }
];

const esm = [
  {
    input: "modules/index.js",
    output: { file: `esm/${fileName}.js`, format: "esm" },
    external: isBareModuleId,
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      replace({ "process.env.BUILD_FORMAT": JSON.stringify("esm") }),
      sizeSnapshot()
    ]
  }
];

const globals = { react: "React" };

const umd = [
  {
    input: "modules/index.js",
    output: {
      file: `umd/${fileName}.js`,
      format: "umd",
      name: "ReactRouter",
      globals
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/react-is/index.js": ["isValidElementType"]
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development"),
        "process.env.BUILD_FORMAT": JSON.stringify("umd")
      }),
      sizeSnapshot()
    ]
  },
  {
    input: "modules/index.js",
    output: {
      file: `umd/${fileName}.min.js`,
      format: "umd",
      name: "ReactRouter",
      globals
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/react-is/index.js": ["isValidElementType"]
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
        "process.env.BUILD_FORMAT": JSON.stringify("umd")
      }),
      sizeSnapshot(),
      terser()
    ]
  }
];

let config;
switch (process.env.BUILD_ENV) {
  case "cjs":
    config = cjs;
    break;
  case "esm":
    config = esm;
    break;
  case "umd":
    config = umd;
    break;
  default:
    config = cjs.concat(esm).concat(umd);
}

module.exports = config;
