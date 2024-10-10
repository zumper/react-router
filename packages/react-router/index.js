"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = require("react-router/cjs/react-router.min.js");
} else {
  module.exports = require("react-router/cjs/react-router.js");
}
