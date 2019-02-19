import { compile } from "@zumper/react-router";

describe("compile", () => {
  describe('with path="/"', () => {
    const compiled = compile({ path: "/", patterns: {} });

    it("compiles to `^/`", () => {
      expect(compiled.regexp.source).toBe(/^\/?/.source);
    });

    it("matches `/`", () => {
      expect(compiled.regexp.test("/")).toBe(true);
    });

    it("produces keys=`[]`", () => {
      expect(compiled.keys).toEqual([]);
    });
  });

  describe('with path="/somewhere/else"', () => {
    describe("compiles to `^/somewhere/else`", () => {
      const compiled = compile({ path: "/somewhere/else", patterns: {} });
      it("compiles to `^/somewhere/else`", () => {
        expect(compiled.regexp.source).toBe(
          /^\/somewhere\/else\/?(?=[/]|$)/.source
        );
      });
      it("matches `/somewhere/else`", () => {
        expect(compiled.regexp.test("/somewhere/else")).toBe(true);
      });
      it("matches `/somewhere/else/altogether`", () => {
        expect(compiled.regexp.test("/somewhere/else/altogether")).toBe(true);
      });
      it("produces keys=`[]`", () => {
        expect(compiled.keys).toEqual([]);
      });
    });

    describe("+strict compiles to `^/somewhere/else/?`", () => {
      const compiled = compile({
        path: "/somewhere/else",
        patterns: {},
        strict: true
      });
      it("+strict compiles to `^/somewhere/else/?`", () => {
        expect(compiled.regexp.source).toBe(
          /^\/somewhere\/else(?=[/]|$)/.source
        );
      });
      it("matches `/somewhere/else`", () => {
        expect(compiled.regexp.test("/somewhere/else")).toBe(true);
      });
      it("matches `/somewhere/else/altogether`", () => {
        expect(compiled.regexp.test("/somewhere/else/altogether")).toBe(true);
      });
      it("produces keys=`[]`", () => {
        expect(compiled.keys).toEqual([]);
      });
    });

    describe("+exact compiles to `^/somewhere/else$`", () => {
      const compiled = compile({
        path: "/somewhere/else",
        patterns: {},
        exact: true
      });
      it("+exact compiles to `^/somewhere/else$`", () => {
        expect(compiled.regexp.source).toBe(/^\/somewhere\/else\/?$/.source);
      });
      it("matches `/somewhere/else`", () => {
        expect(compiled.regexp.test("/somewhere/else")).toBe(true);
      });
      it("does not match `/somewhere/else/altogether`", () => {
        expect(compiled.regexp.test("/somewhere/else/altogether")).toBe(false);
      });
      it("produces keys=`[]`", () => {
        expect(compiled.keys).toEqual([]);
      });
    });
  });

  describe('with path="/somewhere/:variable/:other"', () => {
    const patterns = {
      variable: /[a-z]+/,
      other: /(?:._.)*happy/
    };
    describe("compiles to `^/somewhere/([a-z]+)/(?:._.)*happy)`", () => {
      const compiled = compile({
        path: "/somewhere/:variable/:other",
        patterns
      });

      it("matches `/somewhere/ok/happy`", () => {
        expect(compiled.regexp.test("/somewhere/ok/happy")).toBe(true);
      });
      it("matches `/somewhere/ok/a_b,_;happy`", () => {
        expect(compiled.regexp.test("/somewhere/ok/a_b,_;happy")).toBe(true);
      });
      it("does not match `/somewhere/else/altogether`", () => {
        expect(compiled.regexp.test("/somewhere/else/altogether")).toBe(false);
      });
      it("produces keys `[variable, other]`", () => {
        expect(compiled.keys).toEqual([
          { name: "variable", optional: false },
          { name: "other", optional: false }
        ]);
      });
    });
  });

  describe('with path="/(?:some)?\\where/:variable(?:/ending)?"', () => {
    const patterns = {
      variable: /[a-z]+/
    };
    describe("compiles to `^/(?:some)?\\where/([a-z]+)(?:/ending/?)?$`", () => {
      const compiled = compile({
        path: "/(?:some)?\\where/:variable(?:/ending/?)?",
        patterns,
        exact: true,
        strict: true
      });
      it("compiles to `^/(?:some)?\\where/([a-z]+)(?:/ending/?)?$`", () => {
        expect(compiled.regexp.source).toBe(
          /^\/(?:some)?\where\/([a-z]+)(?:\/ending\/?)?$/.source
        );
      });
      it("matches `/somewhere/ok", () => {
        expect(compiled.regexp.test("/somewhere/ok")).toBe(true);
      });
      it("matches `/some_here/ok", () => {
        expect(compiled.regexp.test("/some_here/ok")).toBe(true);
      });
      it("matches `/where/ok", () => {
        expect(compiled.regexp.test("/where/ok")).toBe(true);
      });
      it("matches `/somewhere/else/ending`", () => {
        expect(compiled.regexp.test("/somewhere/else/ending")).toBe(true);
      });
      it("does not match `/some_were/else/altogether`", () => {
        expect(compiled.regexp.test("/some_were/else/altogether")).toBe(false);
      });
    });
  });

  describe('with path="/:one/mid/:two?"', () => {
    const patterns = {
      one: /[a-z]+/,
      two: /\d+/,
      three: /(\d+)-([a-z]*)-([A-Z]*)/
    };
    describe("compiles to `^/([a-z]+)/mid/(\\d+)`", () => {
      const compiled = compile({ path: "/:one/mid/:two?", patterns });

      it("matches `/abc/mid/123`", () => {
        expect(compiled.regexp.test("/abc/mid/123")).toBe(true);
      });
      it("matches `/abc/mid/123/456`", () => {
        expect(compiled.regexp.test("/abc/mid/123/456")).toBe(true);
      });
      it("produces keys `[one, two:optional]`", () => {
        expect(compiled.keys).toEqual([
          { name: "one", optional: false },
          { name: "two", optional: true }
        ]);
      });
    });
  });
});
