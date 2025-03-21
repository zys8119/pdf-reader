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
## API

### Props

| 属性名              | 类型                  | 说明                                 |
|---------------------|-----------------------|--------------------------------------|
| src                 | string                | pdf地址                              |
| vertical            | boolean               | 是否垂直模式                         |
| fixedOutline        | boolean               | 是否固定大纲                         |
| swiper              | Swiper                | SwiperJs                             |
| swiperOptopns       | SwiperJsOptions       | SwiperJsOptions                      |
| outline             | any[]                 | 大纲                                 |
| numPages            | number                | 总页数                               |
| currentPage         | number                | 当前页码                             |
| annotations         | Record<string         | number, string                       |
| currentDrauu        | Drauu                 | -                                    |
| currentDrauuOptopns | `CurrentDrauuOptopns` | -                                    |
| container           | HTMLDivElement        | -                                    |
| showOutline         | boolean               | 是否显示大纲                         |
| isShowThumbnailList | boolean               | 是否显示缩略图                       |
| isOpenDrauu         | boolean               | 是否开启批注                         |
| pdf                 | PDFDocumentProxy      | pdf文档代理或实例                    |
| thumbnailLists      | any[]                 | 缩略图列表                           |
| getThumbnailLists   | `()=>any`             | 获取缩略图列表。默认不执行，还未实现 |
| prevPage            | `()=>void`            | 切换上一页                           |
| nextPage            | `()=>void`            | 切换下一页                           |
| showTools           | boolean               | 是否显示地步操作工具页               |
### Events
| 事件名 | 说明                 |
|--------|----------------------|
| change | 当前页码生命周期回调 |
### 插槽
| 名称 | 类型或参数 | 说明 |
|------|------------|------|
| tool | -          | -    |

### CurrentDrauuOptopns

| 属性名 | 类型                                                                    | 说明 |
|--------|-------------------------------------------------------------------------|------|
| mode   | 'draw' 、 'stylus' 、 'line' 、 'rectangle' 、 'ellipse' 、 'eraseLine' | 模式 |
| color  | number                                                                  | 颜色 |
| size   | number                                                                  | 粗细 |

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