import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "warn", //catch unused variables
      "no-undef": "error", //prevent use of undeclared variables
      curly : "error", //enforce braces arounf if/else statements
      semi : ["error", "always"], //enforce semicolons
      quotes : ["error", "double"], //enforce consistentquotes
      indent : ["error", 2], //enforce consistent indentation
      "object-curly-spacing": ["error", "always"], //enforce spacing inside curly braces
      "no-console": "off"
    },
  },
]);
