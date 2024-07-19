import eslintConfigPrettier from "eslint-config-prettier";


export default [{
  ignores: ["**/dist"],
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-namespace": 0,
    "padding-line-between-statements": ["error", {
      blankLine: "always",
      prev: "*",
      next: "block-like",
    }, {
      blankLine: "always",
      prev: "block-like",
      next: "*",
    }, {
      blankLine: "always",
      prev: "block-like",
      next: "block-like",
    }, {
      blankLine: "always",
      prev: "*",
      next: ["const", "let", "var"],
    }, {
      blankLine: "always",
      prev: ["const", "let", "var"],
      next: "*",
    }, {
      blankLine: "any",
      prev: ["const", "let", "var"],
      next: ["const", "let", "var"],
    }, {
      blankLine: "always",
      prev: "*",
      next: "return",
    }],
  },
}, eslintConfigPrettier];