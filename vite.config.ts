import babel from "@rolldown/plugin-babel"
import tailwindcss from "@tailwindcss/vite"
import react, { reactCompilerPreset } from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import obfuscationPlugin from "vite-plugin-javascript-obfuscator"

export default defineConfig(({ mode }) => ({
  build: { sourcemap: false },
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    mode === "production" &&
      obfuscationPlugin({
        apply: "build",
        exclude: [/node_modules/],
        include: ["src/**/*.js", "src/**/*.ts", "src/**/*.jsx", "src/**/*.tsx"],
        options: {
          compact: true,
          controlFlowFlattening: true,
          deadCodeInjection: true,
          debugProtection: true,
          selfDefending: true,
          stringArray: true,
          stringArrayThreshold: 0.75,
        },
      }),
  ].filter(Boolean),
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
}))
