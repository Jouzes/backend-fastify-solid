import babelParser from "@babel/eslint-parser";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        babelOptions: {
          presets: [["@babel/preset-typescript", { ignoreExtensions: true }]],
        },
        ecmaVersion: "latest",
        requireConfigFile: false,
        sourceType: "module",
      },
    },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/semi": ["error", "always"],
    },
  },
];
