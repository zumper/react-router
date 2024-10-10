"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("react-router-dom/cjs/react-router-dom.min.js");
} else {
  module.exports = require("react-router-dom/cjs/react-router-dom.js");
}
