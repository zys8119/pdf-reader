# pdf-reader

vue3 编写的 pdf 阅读器

## 安装
```bash
pnpm install pdf-reader
```

## 使用

```vue
<template>
    <div class='App abs-content'>
        <pdfReader :src="pdf"></pdfReader>
    </div>
</template>
<script setup lang="ts">
import "pdf-reader/style.css"
import pdfReader, { GlobalWorkerOptions } from "pdf-reader"
import workerUrl from "pdf-reader/pdf.worker.mjs?url"
import pdf from "./test1.pdf?url"
GlobalWorkerOptions.workerSrc = workerUrl
</script>
<style scoped lang="less">
.App {}
</style>
```