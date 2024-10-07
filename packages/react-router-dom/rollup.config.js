const path = require("path");
const babel = require("rollup-plugin-babel");
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const kebabCase = require("lodash/kebabCase");
const { terser } = require("rollup-plugin-terser");

const pkg = require("./package.json");

const fileName = kebabCase(pkg.name);

function isBareModuleId(id) {
  return (
    !id.startsWith(".") && !id.includes(path.join(process.cwd(), "modules"))
  );
}

const cjs = [
  {
    input: "index.js",
    output: {
      file: `cjs/${fileName}.js`,
      sourcemap: true,
      format: "cjs",
      esModule: false
    },
    external: isBareModuleId,
    plugins: [
      babel({ exclude: /node_modules/, sourceMaps: true }),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") })
    ]
  },
  {
    input: "index.js",
    output: { file: `cjs/${fileName}.min.js`, sourcemap: true, format: "cjs" },
    external: isBareModuleId,
    plugins: [
      babel({ exclude: /node_modules/, sourceMaps: true }),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser()
    ]
  }
];

const esm = [
  {
    input: "modules/index.js",
    output: { file: `esm/${fileName}.js`, sourcemap: true, format: "esm" },
    external: isBareModuleId,
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        sourceMaps: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      })
    ]
  }
];

const globals = { react: "React" };

const umd = [
  {
    input: "modules/index.js",
    output: {
      file: `umd/${fileName}.js`,
      sourcemap: true,
      sourcemapPathTransform: relativePath =>
        relativePath.replace(/^.*?\/node_modules/, "../../node_modules"),
      format: "umd",
      name: "ReactRouterDOM",
      globals
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        sourceMaps: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "../../node_modules/react-is/index.js": ["isValidElementType"]
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("development")
      })
    ]
  },
  {
    input: "modules/index.js",
    output: {
      file: `umd/${fileName}.min.js`,
      sourcemap: true,
      sourcemapPathTransform: relativePath =>
        relativePath.replace(/^.*?\/node_modules/, "../../node_modules"),
      format: "umd",
      name: "ReactRouterDOM",
      globals
    },
    external: Object.keys(globals),
    plugins: [
      babel({
        exclude: /node_modules/,
        runtimeHelpers: true,
        sourceMaps: true,
        plugins: [["@babel/transform-runtime", { useESModules: true }]]
      }),
      nodeResolve(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "../../node_modules/react-is/index.js": ["isValidElementType"]
        }
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production")
      }),
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
