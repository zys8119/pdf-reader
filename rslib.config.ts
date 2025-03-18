import { defineConfig } from "@rslib/core";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginLess } from "@rsbuild/plugin-less";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "es2021",
      dts: true,
    },
  ],
  plugins: [pluginVue(), pluginLess()],
});
