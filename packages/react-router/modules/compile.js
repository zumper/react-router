/**
 * compile a route spec from { path, patterns, ... } into a { re, keys, ... } 'pre-compiled'
 * form, for use with `<Router {...route}>` / `matchPath(path, route)`
 *
 * this is done by iterating over options.patterns key=>RegExp mapping and replacing occurrences
 * of `:key` in options.path with RegExp.source, then compiling the final results using flags etc.
 */

import invariant from "tiny-invariant";
import warning from "tiny-warning";

const WARN_RE = /[(][^?=]/;

const compile = options => {
  const { path, patterns, sensitive, strict, exact, warn = true } = options;
  if (path && patterns) {
    const flags = sensitive === false ? "i" : "";
    const last = path[path.length - 1];
    const keys = [];
    const keyRe = new RegExp(
      ":(" + Object.keys(patterns).join("|") + "\\b)([*?]?)",
      "g"
    );
    const newPath = [
      "^",
      // process the path, replacing `:name` with `(pattern.source)` ONLY if `name` has a mapping
      path.replace(keyRe, (_, name, op) => {
        const pattern = patterns[name];
        const source = pattern.source;
        if (warn) {
          if (WARN_RE.test(source)) {
            warning(true, "dangerous pattern detected (nested groups)");
          }
          if (pattern.flags && pattern.flags !== flags) {
            invariant(
              true,
              `sub pattern "${name}" has flags "${
                pattern.flags
              }", and they contradict global flags: "${flags}"`
            );
          }
        }
        keys.push({ name, optional: op === "?" });
        return `(${source})${op || ""}`;
      }),
      // if `strict` no-op, else: ensure we end with '/?'
      strict ? "" : last === "/" ? "?" : "/?",
      // if `exact` end with '$', else: match up until the next '/' or end-of-string
      exact ? "$" : last === "/" ? "" : "(?=[/]|$)"
    ].join("");
    return {
      ...options,
      // case insensitivity MUST BE EXPLICIT.
      regexp: new RegExp(newPath, flags),
      keys
    };
  }
  if (warn) {
    warning(true, "nothing found to compile: returning options unchanged");
  }
  return options;
};

export default compile;
