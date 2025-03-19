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
      syntax: "es5",
      dts: true,
      bundle: true,
    },
  ],
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: ["vue", "@vueuse/core"],
          dts: "src/auto-imports.d.ts",
        }),
      ],
    },
  },
  plugins: [
    pluginLess(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
      babelLoaderOptions: {
        plugins: [
          [
            "babel-plugin-polyfill-corejs3",
            {
              method: "usage-pure",
              targets: { ie: "10" },
              version: "3.29",
            },
          ],
        ],
      },
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
      {
        from: "./node_modules/pdfjs-dist/build/pdf.worker.mjs",
        context: "./",
      },
    ],
  },
});
