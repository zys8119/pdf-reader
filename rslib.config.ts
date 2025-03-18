import { defineConfig } from "@rslib/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginVueJsx } from "@rsbuild/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/rspack";

export default defineConfig({
  lib: [
    {
      format: "esm",
      syntax: "es2021",
      dts: true,
      bundle: true,
    },
  ],
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: ["vue"],
          dts: "src/auto-imports.d.ts",
        }),
      ],
    },
  },
  plugins: [
    pluginLess(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVue(),
    pluginVueJsx(),
  ],
  output: {
    copy: [
      {
        from: "./uno.css",
        context: "./src",
      },
    ],
  },
});
