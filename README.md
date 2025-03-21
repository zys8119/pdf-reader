# @zys/pdf-reader

vue3 编写的 pdf 阅读器

## 安装
```bash
pnpm install @zys/pdf-reader
```

## 使用

```vue
<template>
    <div class='App abs-content'>
        <pdfReader :src="pdf"></pdfReader>
    </div>
</template>
<script setup lang="ts">
import "@zys/pdf-reader/style.css"
import pdfReader, { GlobalWorkerOptions } from "@zys/pdf-reader"
import workerUrl from "@zys/pdf-reader/pdf.worker.mjs?url"
import pdf from "./test1.pdf?url"
GlobalWorkerOptions.workerSrc = workerUrl
</script>
<style scoped lang="less">
.App {}
</style>
```

## 功能

| 功能   | 状态 | 说明             |
|--------|------|------------------|
| 缩放   | ✅    | -                |
| 翻页   | ✅    | -                |
| 横竖屏 | ✅    | -                |
| 缩略图 | ☑️    | 待完善，按需加载 |
| 大纲   | ✅    | -                |
| 批注   | ✅    | -                |

## 批注功能

| 功能         | 状态 | 说明     |
|--------------|------|----------|
| 清空         | ✅    | -        |
| 撤回         | ✅    | -        |
| 笔的粗细     | ✅    | -        |
| 笔的模式     | ✅    | -        |
| 是否开启批注 | ✅    | 默认开启 |

## 兼容性

- 支持 IE11+
- 支持移动端
- 向下兼容到 chrome 87+ （已校验， 其他版本自行校验）

## 资料

- pdf版本：[pdfjs-dist(2.16.105)](https://www.npmjs.com/package/pdfjs-dist)
- 批注功能依赖：[drauu](https://drauu.netlify.app/)、[github](https://github.com/antfu/drauu)
- vueuse:13.0.0