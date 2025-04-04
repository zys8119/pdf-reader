import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      configFile: "../uno.config.ts",
      hmrTopLevelAwait: false,
    }),
  ],
  build: {
    target: "es2015",
  },
});
