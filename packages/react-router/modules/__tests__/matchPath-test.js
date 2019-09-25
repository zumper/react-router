import { compile, matchPath } from "@zumper/react-router";

describe("matchPath", () => {
  describe("without path property on params", () => {
    it("doesn't throw an exception", () => {
      expect(() => {
        matchPath("/milkyway/eridani", { hash: "foo" });
      }).not.toThrow();
    });
  });

  describe('with path="/"', () => {
    it('returns correct url at "/"', () => {
      const path = "/";
      const pathname = "/";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/");
    });

    it('returns correct url at "/somewhere/else"', () => {
      const path = "/";
      const pathname = "/somewhere/else";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/");
    });
  });

  describe('with path="/somewhere"', () => {
    it('returns correct url at "/somewhere"', () => {
      const path = "/somewhere";
      const pathname = "/somewhere";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/somewhere");
    });

    it('returns correct url at "/somewhere/else"', () => {
      const path = "/somewhere";
      const pathname = "/somewhere/else";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/somewhere");
    });
  });

  describe("with an array of paths", () => {
    it("accepts an array as 2nd argument", () => {
      const path = ["/somewhere", "/elsewhere"];
      const pathname = "/elsewhere";
      const match = matchPath(pathname, path);
      expect(match.url).toBe("/elsewhere");
    });

    it('return the correct url at "/elsewhere"', () => {
      const path = ["/somewhere", "/elsewhere"];
      const pathname = "/elsewhere";
      const match = matchPath(pathname, { path });
      expect(match.url).toBe("/elsewhere");
    });

    it('returns correct url at "/elsewhere/else"', () => {
      const path = ["/somewhere", "/elsewhere"];
      const pathname = "/elsewhere/else";
      const match = matchPath(pathname, { path });
      expect(match.url).toBe("/elsewhere");
    });

    it('returns correct url at "/elsewhere/else" with path "/" in array', () => {
      const path = ["/somewhere", "/"];
      const pathname = "/elsewhere/else";
      const match = matchPath(pathname, { path });
      expect(match.url).toBe("/");
    });

    it('returns correct url at "/somewhere" with path "/" in array', () => {
      const path = ["/somewhere", "/"];
      const pathname = "/somewhere";
      const match = matchPath(pathname, { path });
      expect(match.url).toBe("/somewhere");
    });
  });

  describe("with sensitive path", () => {
    it("returns non-sensitive url", () => {
      const options = {
        path: "/SomeWhere"
      };
      const pathname = "/somewhere";
      const match = matchPath(pathname, options);
      expect(match.url).toBe("/somewhere");
    });

    it("returns sensitive url", () => {
      const options = {
        path: "/SomeWhere",
        sensitive: true
      };
      const pathname = "/somewhere";
      const match = matchPath(pathname, options);
      expect(match).toBe(null);
    });
  });

  describe("cache", () => {
    it("creates a cache entry for each exact/strict pair", () => {
      // true/false and false/true will collide when adding booleans
      const trueFalse = matchPath("/one/two", {
        path: "/one/two/",
        exact: true,
        strict: false
      });
      const falseTrue = matchPath("/one/two", {
        path: "/one/two/",
        exact: false,
        strict: true
      });
      expect(!!trueFalse).toBe(true);
      expect(!!falseTrue).toBe(false);
    });
  });

  describe("compile", () => {
    const patterns = {
      string: /[a-z]+/,
      number: /\d+/
    };
    const compiled = compile({ path: "/s-:string/n-:number", patterns });
    it("use compiled path to match", () => {
      const match = matchPath("/s-abc/n-123", compiled);
      expect(Object.keys(match.params)).toEqual(["string", "number"]);
      expect(match.params["string"]).toBe("abc");
      expect(match.params["number"]).toBe("123");
    });
    it("use compiled path, does not match b/c is case-sensitive", () => {
      const match = matchPath("/s-ABC/n-123", compiled);
      expect(match).toBe(null);
    });
    const compiledI = compile({
      path: "/s-:string/n-:number",
      patterns,
      sensitive: false
    });
    it("use compiled path to case-insensitive match", () => {
      const match = matchPath("/s-ABC/n-123", compiledI);
      expect(Object.keys(match.params)).toEqual(["string", "number"]);
      expect(match.params["string"]).toBe("ABC");
      expect(match.params["number"]).toBe("123");
    });

    describe("with an array of paths", () => {
      const patterns = {
        string: /[a-z]+/,
        number: /\d+/
      };
      const compiled = compile({
        path: ["/somewhere/s-:string/n-:number", "/elsewhere/n-:number"],
        patterns
      });
      it("use first compiled path to match", () => {
        const match = matchPath("/somewhere/s-abc/n-123", compiled);
        expect(Object.keys(match.params)).toEqual(["string", "number"]);
        expect(match.params["string"]).toBe("abc");
        expect(match.params["number"]).toBe("123");
      });
      it("use second compiled path to match", () => {
        const match = matchPath("/elsewhere/n-123", compiled);
        expect(Object.keys(match.params)).toEqual(["number"]);
        expect(match.params["number"]).toBe("123");
      });
      it("use compiled path, does not match b/c is case-sensitive", () => {
        const match = matchPath("/somewhere/s-ABC/n-123", compiled);
        expect(match).toBe(null);
      });
    });
  });
});
