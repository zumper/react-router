"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/zumper-react-router-dom.min.js");
} else {
  module.exports = require("./cjs/zumper-react-router-dom.js");
}
