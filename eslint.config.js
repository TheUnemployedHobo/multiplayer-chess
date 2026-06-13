import js from "@eslint/js"
import perfectionist from "eslint-plugin-perfectionist"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  globalIgnores(["dist"]),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      perfectionist.configs["recommended-natural"],
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
