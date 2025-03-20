import { defineConfig } from "@rslib/core";
import { pluginLess } from "@rsbuild/plugin-less";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginVueJsx } from "@rsbuild/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/rspack";
export default defineConfig({
  source: {
    include: [/node_modules[\\/]pdfjs-dist[\\/]/],
  },
  lib: [
    {
      format: "esm",
      syntax: "es2015",
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
            "polyfill-corejs3",
            {
              method: "usage-global",
              targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
              },
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
        from: "./node_modules/pdfjs-dist/legacy/build/pdf.worker.js",
        context: "./",
      },
    ],
    polyfill: "usage",
  },
});
